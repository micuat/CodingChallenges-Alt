// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/dncudkelNxw

// instance mode by Naoto Hieda

var s = function (sketch) {

  var sun;
  var cam;

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sun = new Planet(sketch, 50, 0, 0);
    sun.spawnMoons(4, 1);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.lights();
    sun.show();
    sun.orbit();
  }

};

var myp5 = new p5(s);
