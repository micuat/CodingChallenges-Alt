// Daniel Shiffman
// http://codingtra.in
// Islamic Star Patterns
// Video Part 1: https://youtu.be/sJ6pMLp_IaI
// Video Part 2: [coming soon]
// Based on: http://www.cgl.uwaterloo.ca/csk/projects/starpatterns/

// Repo with more tiling patterns and features
// https://github.com/CodingTrain/StarPatterns

// instance mode by Naoto Hieda

// var poly;
var polys = [];

var angle = 75;
var delta = 10;

var deltaSlider;
var angleSlider;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    //angleMode(DEGREES);
    sketch.background(51);
    // deltaSlider = sketch.createSlider(0, 25, 10);
    // angleSlider = sketch.createSlider(0, 90, 75);

    var inc = 100;
    for (var x = 0; x < sketch.width; x += inc) {
      for (var y = 0; y < sketch.height; y += inc) {
        var poly = new Polygon(sketch);
        poly.addVertex(x, y);
        poly.addVertex(x + inc, y);
        poly.addVertex(x + inc, y + inc);
        poly.addVertex(x, y + inc);
        poly.close();
        polys.push(poly);
      }
    }
  }

  sketch.draw = function () {
    sketch.background(51);
    angle = sketch.map(sketch.mouseX, 0, sketch.width, 0, 90);//angleSlider.value();
    delta = sketch.map(sketch.mouseY, 0, sketch.height, 0, 25);//deltaSlider.value();
    //console.log(angle, delta);
    for (var i = 0; i < polys.length; i++) {
      polys[i].hankin();
      polys[i].show();
    }
  }

};

var myp5 = new p5(s);
