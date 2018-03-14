// Daniel Shiffman
// http://codingtra.in
// Butterfly Wings
// Video: [coming soon]

// instance mode by Naoto Hieda

var yoff = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
  }

  sketch.draw = function () {
    sketch.background(51);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    //rotate(PI / 2);

    sketch.stroke(255);
    sketch.fill(255, 50);
    sketch.strokeWeight(1);

    var da = sketch.PI / 200;
    var dx = 0.05;

    var xoff = 0;
    sketch.beginShape();
    for (var a = 0; a <= sketch.TWO_PI; a += da) {
      var n = sketch.noise(xoff, yoff);
      var r = sketch.sin(2 * a) * sketch.map(n, 0, 1, 50, 300);
      var x = r * sketch.cos(a);
      var y = r * sketch.sin(a);
      if (a < sketch.PI) {
        xoff += dx;
      } else {
        xoff -= dx;
      }
      //point(x, y);
      sketch.vertex(x, y);
    }
    sketch.endShape();

    yoff += 0.01;
  }

};

var myp5 = new p5(s);