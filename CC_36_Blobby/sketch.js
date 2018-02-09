// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/Cl_Gjj80gPE

// instance mode by Naoto Hieda

var yoff = 0.0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
  }

  sketch.draw = function () {
    sketch.background(0);

    sketch.translate(sketch.width / 2, sketch.height / 2);

    var radius = 150;

    sketch.beginShape();
    var xoff = 0;
    for (var a = 0; a < sketch.TWO_PI; a += 0.1) {
      var offset = sketch.map(sketch.noise(xoff, yoff), 0, 1, -25, 25);
      var r = radius + offset;
      var x = r * sketch.cos(a);
      var y = r * sketch.sin(a);
      sketch.vertex(x, y);
      xoff += 0.1;
      //ellipse(x, y, 4, 4);
    }
    sketch.endShape();

    yoff += 0.01;
  }

};

var myp5 = new p5(s);

