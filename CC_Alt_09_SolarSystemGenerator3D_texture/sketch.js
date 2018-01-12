// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/FGAwi7wpU8c

// instance mode by Naoto Hieda

var textures = [];
var numLights = 0;
var lp;
var count = 0;
var speed = 1;

var s = function (sketch) {

  var sun;
  var cam;
  var intensity = [10, 50, 80, 150, 250, 150, 80, 50];
  var sunTexture;

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sunTexture = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/sun.jpg");
    textures[0] = sketch.createGraphics(400, 400);
    textures[1] = sketch.createGraphics(400, 400);
    textures[2] = sketch.createGraphics(400, 400);
    //textures[0] = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/mars.jpg");
    // textures[1] = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/earth.jpg");
    // textures[2] = sketch.loadImage("../../CC_09_SolarSystemGenerator3D_texture/data/mercury.jpg");
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sun = new Planet(sketch, 50, 0, 0, textures[0]);
    sun.spawnMoons(4, 1);

    sketch.frameRate(60);
  }

  sketch.draw = function () {
    if((sketch.millis() / 1000) % 4 < 3 ) speed = 1;
    else speed = 0.1;

    count += speed;

    textures[0].beginDraw();
    textures[0].background(0, 0);
    textures[0].noStroke();
    textures[0].fill(255, 200);
    textures[0].rect(0, (count * 10) % 400, 400, 20);
    textures[0].rect(0, (count * 10 + 80) % 400, 400, 20);
    textures[0].rect(0, (count * 10 + 160) % 400, 400, 20);
    textures[0].endDraw();
    
    textures[1].beginDraw();
    textures[1].background(0, 0);
    textures[1].noStroke();
    textures[1].fill(255, 200);
    textures[1].rect(0, (count * 20) % 400, 400, 20);
    textures[1].rect(0, (count * 20 + 40) % 400, 400, 20);
    textures[1].rect(0, (count * 20 + 80) % 400, 400, 20);
    textures[1].endDraw();

    textures[2].beginDraw();
    textures[2].background(0, 0);
    textures[2].noStroke();
    textures[2].fill(255, 200);
    textures[2].rect(0, (count * 10) % 400, 400, 20);
    textures[2].rect(0, (count * 10 + 20) % 400, 400, 20);
    textures[2].rect(0, (count * 10 + 40) % 400, 400, 20);
    textures[2].endDraw();

    numLights = 0;
    lp = [];
    sketch.background(0);
    sun.light();
    for(var i = 0; i < lp.length; i++) {
      var p = lp[i];
      var l = ((sketch.frameCount) + i * 32) % 256;
      if(l > 128) l = 256 - l;
      l = 200;
      sketch.pointLight(l, l, l, p[0], p[1], p[2] - 10);
    }
    sun.show();
    sun.orbit();
    }

};

var myp5 = new p5(s);
