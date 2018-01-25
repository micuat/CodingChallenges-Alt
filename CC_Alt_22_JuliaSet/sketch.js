// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fAsaSkmbF5s

// instance mode by Naoto Hieda

var angle0 = 0;
var angle1 = 0;

var shader;
var shader_blur;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    shader = sketch.loadShader("../../CC_Alt_22_JuliaSet/frag.glsl");
    shader_blur = sketch.loadShader("../../CC_Alt_22_JuliaSet/blur.glsl");
  }

  sketch.draw = function () {
    // if(sketch.frameCount % 60 == 0) {
    //   shader = sketch.loadShader("../../CC_Alt_22_JuliaSet/frag.glsl");
    //   shader_blur = sketch.loadShader("../../CC_Alt_22_JuliaSet/blur.glsl");
    // }
    var dt0 = 0.05;
    var dt1 = 0.04;

    if(sketch.abs(angle0 - sketch.PI) < 0.075) dt0 /= 50;
    if(sketch.abs(angle1 - sketch.PI) < 0.075) dt1 /= 50;
    angle0 = (angle0 + dt0) % sketch.TWO_PI;
    angle1 = (angle1 + dt1) % sketch.TWO_PI;
    var ca = sketch.cos(angle0);
    var cb = sketch.sin(angle1);
    shader.set("ca", ca);
    shader.set("cb", cb);
    shader.set("width", sketch.width);
    shader.set("height", sketch.height);

    sketch.fill(255);
    sketch.rect(0, 0, sketch.width, sketch.height);
    sketch.filter(shader);
    sketch.filter(shader_blur);
  }

};

var myp5 = new p5(s);
