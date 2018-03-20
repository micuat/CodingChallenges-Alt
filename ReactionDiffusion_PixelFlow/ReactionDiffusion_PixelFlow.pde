
// Reaction Diffusion
// author: diewald

import com.jogamp.opengl.GL2;
import com.thomasdiewald.pixelflow.java.DwPixelFlow;
import com.thomasdiewald.pixelflow.java.dwgl.DwGLSLProgram;
import com.thomasdiewald.pixelflow.java.dwgl.DwGLTexture;
import com.thomasdiewald.pixelflow.java.imageprocessing.filter.DwFilter;

import processing.core.PApplet;
import processing.opengl.PGraphics2D;

DwGLSLProgram shader;

DwGLSLProgram shader_grayscott;
DwGLSLProgram shader_render;

// multipass rendering texture
DwGLTexture.TexturePingPong tex_grayscott = new DwGLTexture.TexturePingPong();

// final render target for display
PGraphics2D tex_render;

DwPixelFlow context;
int pass = 0;

public void settings() {
  size(1200, 1200, P2D);
  smooth(0);
}

public void setup() {
  
  // pixelflow context
  context = new DwPixelFlow(this);

  // 1) 32 bit per channel
  tex_grayscott.resize(context, GL2.GL_RG32F, width, height, GL2.GL_RG, GL2.GL_FLOAT, GL2.GL_NEAREST, 2, 4);
  
  // 2) 16 bit per channel, lack of precision is obvious in the result, its fast though
  // tex_grayscott.resize(context, GL2.GL_RG16F, width, height, GL2.GL_RG, GL2.GL_FLOAT, GL2.GL_NEAREST, 2, 2);
  
  
  // glsl shader
  shader_grayscott = context.createShader("data/grayscott.frag");
  shader_render    = context.createShader("data/render.frag");
      
  shader = context.createShader(sketchPath("data/frag.glsl"));

  // init
  tex_render = (PGraphics2D) createGraphics(width, height, P2D);
  tex_render.smooth(0);
  tex_render.beginDraw();
  tex_render.textureSampling(2);
  tex_render.blendMode(REPLACE);
  tex_render.clear();
  tex_render.noStroke();
  tex_render.background(0x00FF0000);
  tex_render.fill      (0x0000FF00);
  tex_render.noStroke();
  tex_render.rectMode(CENTER);
  tex_render.rect(width/2 - 100, height/2, 20, 20);
  tex_render.rect(width/2 + 100, height/2, 20, 20);
  tex_render.endDraw();

  // copy initial data to source texture
  DwFilter.get(context).copy.apply(tex_render, tex_grayscott.src);

  frameRate(1000);
}


public void reactionDiffusionPass(){
  context.beginDraw(tex_grayscott.dst);
  shader_grayscott.begin();
  shader_grayscott.uniform1f     ("dA"    , 1.0f  );
  shader_grayscott.uniform1f     ("dB"    , 0.5f  );
  shader_grayscott.uniform1f     ("feed"  , 0.0397f);
  shader_grayscott.uniform1f     ("kill"  , 0.0619f);
  //shader_grayscott.uniform1f     ("feed"  , 0.0387f);
  //shader_grayscott.uniform1f     ("kill"  , 0.0629f);
  shader_grayscott.uniform1f     ("dt"    , 1f    );
  shader_grayscott.uniform2f     ("wh_rcp", 1f/width, 1f/height);
  shader_grayscott.uniformTexture("tex"   , tex_grayscott.src);
  shader_grayscott.drawFullScreenQuad();
  shader_grayscott.end();
  context.endDraw("reactionDiffusionPass()"); 
  tex_grayscott.swap();
  pass++;
}


public void draw() {
  // multipass rendering, ping-pong 
  context.begin();
  for(int i = 0; i < 100; i++){
    reactionDiffusionPass();
  }

  // create display texture
  context.beginDraw(tex_render);
  shader_render.begin();
  shader_render.uniform2f     ("wh_rcp", 1f/width, 1f/height);
  shader_render.uniformTexture("tex"   , tex_grayscott.src);
  shader_render.drawFullScreenQuad();
  shader_render.end();
  context.endDraw("render()"); 
  context.end();
  
  
  //if(frameCount == 1000) 
  saveFrame("grayscott/######.png");
  
  // put it on the screen
  blendMode(REPLACE);
  image(tex_render, 0, 0);
  
  String txt_fps = String.format(getClass().getSimpleName()+ "   [size %d/%d]   [frame %d]   [fps %6.2f]", width, height, pass, frameRate);
  surface.setTitle(txt_fps);
}