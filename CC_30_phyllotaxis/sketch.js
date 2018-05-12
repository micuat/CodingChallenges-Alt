// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/KWoJgHFYWxY

// instance mode by Naoto Hieda

var n = 0;
var c = 3;

var points = [];

var start = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(400, 400);
    // p.angleMode(p.DEGREES);
    p.colorMode(p.HSB);
  }

  p.draw = function () {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(n * 0.3);
    for (let i = 0; i < n; i++) {
      let a = i * p.radians(137.5);
      let r = c * p.sqrt(i);
      let x = r * p.cos(a);
      let y = r * p.sin(a);
      // var hu = p.sin(start + i * 0.5);
      // hu = p.map(hu, -1, 1, 0, 360);
      let hu = i+start;
      hu = i/3.0 % 360;
      p.fill(hu, 255, 255);
      p.noStroke();
      p.ellipse(x, y, 4, 4);
    }
    n += 5;
    start += 5;
  }

};

var p030 = new p5(s);
