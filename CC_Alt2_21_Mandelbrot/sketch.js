// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

// instance mode by Naoto Hieda

var minval = -0.5;
var maxval = 0.5;

var shader;
var shader_blur;

var t2 = 0;

var s = function (p) {
  this.shader;

  p.setup = function () {
    p.createCanvas(800, 800);
    p.pixelDensity(1);
    shader = p.loadShader("../../CC_Alt2_21_Mandelbrot/frag.glsl");
    shader_blur = p.loadShader("../../CC_Alt2_21_Mandelbrot/blur.glsl");
  }

  p.draw = function () {
    if(p.frameCount % 60 == 0) {
      shader = p.loadShader("../../CC_Alt2_21_Mandelbrot/frag.glsl");
      shader_blur = p.loadShader("../../CC_Alt2_21_Mandelbrot/blur.glsl");
    }
    let t = p.millis() * 0.0002 % p.TWO_PI;
    t = p.map(p.sin(t), -1, 1, 0, 1);
    t = t * t * t * 0.1;
    // t = p.log(t);

    // if(t > 0.5) t = 1 - t;
    // t *= 4;
    // t += 1;

    shader.set("t", t);
    shader_blur.set("t", t);
    let t2d = (p.millis() * 0.0002 + p.PI/2) % p.TWO_PI;
    if(t2d > p.PI) t2d = p.TWO_PI - t2d;
    t2 = p.lerp(t2, t2d, 0.05);
    shader.set("t2", t2);
    // shader.set("t2", p.sin(p.millis() * 0.001 % p.TWO_PI));
    // p.fill(255);
    // p.rect(0, 0, p.width, p.height/2);
    // p.filter(this.shader);
    p.filter(shader);
    p.filter(shader_blur);

    return;
    console.log(p.frameRate());
  }
};

var p021 = new p5(s);
