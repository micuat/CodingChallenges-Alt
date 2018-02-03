// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KWoJgHFYWxY

// instance mode by Naoto Hieda

var n = 0;
var c = 3;

var points = [];

var start = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    // sketch.angleMode(sketch.DEGREES);
    sketch.colorMode(sketch.HSB);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.rotate(n * 0.3);
    for (var i = 0; i < n; i++) {
      var a = i * sketch.radians(137.5);
      var r = c * sketch.sqrt(i);
      var x = r * sketch.cos(a);
      var y = r * sketch.sin(a);
      // var hu = sketch.sin(start + i * 0.5);
      // hu = sketch.map(hu, -1, 1, 0, 360);
      var hu = i+start;
      hu = i/3.0 % 360;
      sketch.fill(hu, 255, 255);
      sketch.noStroke();
      sketch.ellipse(x, y, 4, 4);
    }
    n += 5;
    start += 5;
  }

};

var myp5 = new p5(s);
