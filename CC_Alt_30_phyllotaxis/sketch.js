// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KWoJgHFYWxY

// instance mode by Naoto Hieda

var n = 0;
var c = 3;

var points = [];

var start = 0;
var tw = 0;
var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    // sketch.angleMode(sketch.DEGREES);
    sketch.colorMode(sketch.HSB);
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    // sketch.rotate(n * 0.3);
    sketch.strokeWeight(3);
    sketch.scale(2,2);
    for (var i = 0; i < n; i++) {
      var r = c * sketch.sqrt(i);
      let t = sketch.sin(tw);
      var a = i * sketch.radians(137.5 + t);
      var x = r * sketch.cos(a);
      var y = r * sketch.sin(a);
      // var hu = sketch.sin(start + i * 0.5);
      // hu = sketch.map(hu, -1, 1, 0, 360);
      var hu = i+start;
      hu = i/3.0 % 360;
      // sketch.fill(255);
      // sketch.noStroke();
      // sketch.ellipse(x, y, 3, 3);
      sketch.stroke(180,hu>180?255:0,255);
      sketch.point(x, y);
    }
    n += 1;
    start += 1;

    if(sketch.millis() * 0.001 % 4 < 1)
      tw += 0.02;
    else if(sketch.millis() * 0.001 % 4 < 2)
      tw *= 0.75;
    else if(sketch.millis() * 0.001 % 4 < 3)
      tw -= 0.02;
    else
      tw *= 0.75;
  }

};

var myp5 = new p5(s);
