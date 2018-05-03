// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/17WoOqgXsRM

// instance mode by Naoto Hieda

var shader, lshader;
var magtex;
var weight = 80.0;

var s = function (p) {

  var stars = [];

  var speed;

  p.setup = function () {
    p.createCanvas(800, 800);
    for (var i = 0; i < 1000; i++) {
      stars[i] = new Star();
    }
    shader = p.loadShader(p.sketchPath("../CC_Alt2_01_StarField/frag.glsl"),
      p.sketchPath("../CC_Alt2_01_StarField/vert.glsl"));

    lshader = p.loadShader(p.sketchPath("../CC_Alt2_01_StarField/lineFrag.glsl"),
      p.sketchPath("../CC_Alt2_01_StarField/lineVert.glsl"));

    magtex = p.loadImage("../CC_Alt2_01_StarField/magnesite.jpg");
  }

  let cur = 0;

  p.draw = function () {

    p.blendMode(p.BLEND);

    if (p.frameCount % 120 == 0) {
      shader = p.loadShader(p.sketchPath("../CC_Alt2_01_StarField/frag.glsl"),
        p.sketchPath("../CC_Alt2_01_StarField/vert.glsl"));
      lshader = p.loadShader(p.sketchPath("../CC_Alt2_01_StarField/lineFrag.glsl"),
        p.sketchPath("../CC_Alt2_01_StarField/lineVert.glsl"));
    }

    let s = p.sin(p.millis() * 0.001);
    if(p.millis() * 0.001 % 4 < 0.1) {
      // p.background(0);
      weight = 20.0;
      speed = 10;
    }
    else if(p.millis() * 0.001 % 4 < 1) {
      weight = 20.0;
      speed = 10;
    }
    else if(p.millis() * 0.001 % 4 < 2) {
      // p.fill(255, 20);
      // p.rect(400,400,800,800);
      weight = 10.0;
      speed = 10;
    }
    else if(p.millis() * 0.001 % 4 < 3) {
      weight = 0.0;
      speed = 10;
    }
    else {
      // p.background(0);
      p.fill(0, 20);
      p.rect(400,400,800,800);
      weight = 0.0;
      speed = 10;
    }
    lshader.set("weight", weight);

    // p.shader(shader);
    p.shader(lshader, p.LINES);

    // speed = 10;//p.constrain(p.map(s, 1, -1, 10, 50), 10, 50);
    p.translate(p.width / 2, p.height / 2);
    // p.directionalLight(255, 255, 255, 0.5, 0.5, -1);
    p.rectMode(p.CENTER);
    for (var i = 0; i < stars.length; i++) {
      stars[i].update(speed);
      stars[i].show();
    }
    p.strokeWeight(weight)
    p.stroke(200);
    // p.line(-200, 100, p.mouseX-400, p.mouseY-400)
  };
};

var p001 = new p5(s);
