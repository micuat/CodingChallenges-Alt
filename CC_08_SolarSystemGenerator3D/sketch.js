// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/dncudkelNxw

// instance mode by Naoto Hieda

var s = function (p) {

  var sun;
  var cam;

  p.setup = function () {
    p.createCanvas(600, 600);
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sun = new Planet(50, 0, 0);
    sun.spawnMoons(4, 1);
  }

  p.draw = function () {
    p.background(0);
    p.lights();
    sun.show();
    sun.orbit();
  }

};

var p008 = new p5(s);
