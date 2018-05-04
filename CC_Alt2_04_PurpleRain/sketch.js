// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KkyIDI6rQJI

// instance mode by Naoto Hieda

// Purple Rain
// (138, 43, 226)
// (230, 230, 250) // background

var shader;

var s = function (p) {

  var drops = [];

  p.setup = function () {
    p.createCanvas(800, 800);
    for (var i = 0; i < 1000; i++) {
      drops[i] = new Drop();
    }
    shader = p.loadShader(p.sketchPath("../CC_Alt2_04_PurpleRain/frag.glsl"));
  }

  p.draw = function () {
    if (p.frameCount % 120 == 0) {
      shader = p.loadShader(p.sketchPath("../CC_Alt2_04_PurpleRain/frag.glsl"));
    }

    let t = p.millis() * 0.0005;
    p.background(0);
    for (var i = 0; i < drops.length; i++) {
      drops[i].fall(t);
      drops[i].show();
    }
    p.push();
    p.fill(255);
    p.translate(p.width/2, p.height/2);
    p.directionalLight(255, 255, 255, 1, 0, -1);
    p.rotateY(t);
    p.pop();

    shader.set("iTime", p.millis() * .001);
    p.filter(shader);
  }

};

var p004 = new p5(s);