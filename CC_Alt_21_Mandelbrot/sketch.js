// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

// instance mode by Naoto Hieda

var minval = -0.5;
var maxval = 0.5;

var shader;
var shader_blur;

var s = function (sketch) {
  this.shader;

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.pixelDensity(1);
    shader = sketch.loadShader("../../CC_Alt_21_Mandelbrot/frag.glsl");
    shader_blur = sketch.loadShader("../../CC_Alt_21_Mandelbrot/blur.glsl");
  }

  sketch.draw = function () {
    if(sketch.frameCount % 60 == 0) {
      shader = sketch.loadShader("../../CC_Alt_21_Mandelbrot/frag.glsl");
      shader_blur = sketch.loadShader("../../CC_Alt_21_Mandelbrot/blur.glsl");
    }
    var t = sketch.millis() * 0.0002 % sketch.TWO_PI;
    t = sketch.map(sketch.sin(t), -1, 1, 0, 1);
    t = t * t;
    // t = sketch.log(t);

    // if(t > 0.5) t = 1 - t;
    // t *= 4;
    // t += 1;

    shader.set("t", t);
    shader.set("t2", sketch.sin(sketch.millis() * 0.001 % sketch.TWO_PI));
    sketch.fill(255);
    sketch.rect(0, 0, sketch.width, sketch.height/2);
    // sketch.filter(this.shader);
    sketch.filter(shader);
    sketch.filter(shader_blur);

    return;
    console.log(sketch.frameRate());
  }
};

var myp5 = new p5(s);
