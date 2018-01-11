// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/dncudkelNxw

// instance mode by Naoto Hieda

var numLights = 0;
var lp;

var s = function (sketch) {

  var sun;
  var cam;
  var intensity = [10, 50, 80, 150, 250, 150, 80, 50];

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
    sun = new Planet(sketch, 50, 0, 0);
    sun.spawnMoons(4, 1);
  }

  sketch.draw = function () {
    numLights = 0;
    lp = [];
    sketch.background(0);
    // sketch.lights();
    sun.light();

    for(var i = 0; i < lp.length; i++) {
      var p = lp[i];
      // var l = 250;
      // if(i == 0 || (sketch.frameCount % 8 == i)) {
      //   sketch.spotLight(l, l, l, p[0], p[1], p[2], 0, 1, 0, sketch.PI/4, 10);
      // }
      var l = ((sketch.frameCount) + i * 32) % 256;
      if(l > 128) l = 256 - l;
      l*=1;
      // var l = intensity[(sketch.floor(sketch.frameCount/30) + i) % 8];
      // if(sketch.frameCount % 8 == i) {
      //   l = 255;
      // }
      sketch.pointLight(l, l, l, p[0], p[1], p[2] - 10);
      // sketch.spotLight(l, l, l, p[0], p[1], p[2] - 100, 0, 0, 1, sketch.PI/2, 10);
    }

    sun.show();
    sun.orbit();
    sketch.fill(255);
    sketch.noStroke();
  }

};

var myp5 = new p5(s);
