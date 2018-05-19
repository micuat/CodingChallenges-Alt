// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/FGAwi7wpU8c

// instance mode by Naoto Hieda

var textures = [];

var s = function (p) {

  var sun;
  var cam;
  var sunTexture;

  p.setup = function () {
    p.createCanvas(600, 600);
    sunTexture = p.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/sun.jpg");
    textures[0] = p.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/mars.jpg");
    textures[1] = p.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/earth.jpg");
    textures[2] = p.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/mercury.jpg");
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sun = new Planet(50, 0, 0, sunTexture);
    sun.spawnMoons(4, 1);
  }

  p.draw = function () {
    p.background(0);
    p.ambientLight(255,255,255);
    p.pointLight(255, 255, 255, 0, 0, 0);
    sun.show();
    sun.orbit();
    }

};

var p009 = new p5(s);
