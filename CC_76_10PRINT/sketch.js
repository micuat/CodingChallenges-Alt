// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// 10PRINT
// https://www.youtube.com/watch?v=bEyTZ5ZZxZs

// instance mode by Naoto Hieda

let x = 0;
let y = 0;
let spacing = 20;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(400, 400);
    p.background(0);
  }

  p.draw = function () {
    p.stroke(255);
    if (p.random(1) < 0.5) {
      p.line(x, y, x + spacing, y + spacing);
    } else {
      p.line(x, y + spacing, x + spacing, y);
    }
    x = x + spacing;
    if (x > p.width) {
      x = 0;
      y = y + spacing;
    }

  }

};

var myp5 = new p5(s);
