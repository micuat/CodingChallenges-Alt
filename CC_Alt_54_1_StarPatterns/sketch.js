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

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.background(0);

    var inc = 50;
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
    sketch.background(0);
    let a = 1.5;
    let t = sketch.millis() * 0.00025 * sketch.TWO_PI;
    //console.log(angle, delta);
    for (var i = 0; i < polys.length; i++) {
      angle = sketch.map(sketch.cos(t), -a, a, 0, 90);//angleSlider.value();
      delta = sketch.map(sketch.sin(t), -a, a, 0, 25);//deltaSlider.value();
      t += sketch.PI / sketch.pow(2, sketch.map(sketch.sin(t), -1, 1, 2, 6));
      polys[i].hankin();
      polys[i].show();
    }
  }

};

var myp5 = new p5(s);
