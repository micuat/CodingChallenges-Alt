// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

// instance mode by Naoto Hieda

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 600, sketch.WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
      }
    }
  }

  sketch.draw = function () {

    flying -= 0.1;
    var yoff = flying;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        terrain[x][y] = sketch.map(sketch.noise(xoff, yoff), 0, 1, -100, 100);
        xoff += 0.2;
      }
      yoff += 0.2;
    }


    sketch.background(0);
    sketch.translate(0, 50);
    sketch.rotateX(sketch.PI / 3);
    sketch.fill(200, 200, 200, 50);
    sketch.translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
      sketch.beginShape(sketch.TRIANGLE_STRIP);
      for (var x = 0; x < cols; x++) {
        sketch.vertex(x * scl, y * scl, terrain[x][y]);
        sketch.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      }
      sketch.endShape();
    }
  }

};

var myp5 = new p5(s);
