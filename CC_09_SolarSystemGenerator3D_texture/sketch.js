// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/FGAwi7wpU8c

// instance mode by Naoto Hieda

var textures = [];

var s = function (sketch) {

  var sun;
  var cam;
  var sunTexture;

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    sunTexture = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/sun.jpg");
    textures[0] = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/mars.jpg");
    textures[1] = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/earth.jpg");
    textures[2] = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/mercury.jpg");
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sun = new Planet(sketch, 50, 0, 0, sunTexture);
    sun.spawnMoons(4, 1);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.ambientLight(255,255,255);
    sketch.pointLight(255, 255, 255, 0, 0, 0);
    sun.show();
    sun.orbit();
    }

};

var myp5 = new p5(s);
