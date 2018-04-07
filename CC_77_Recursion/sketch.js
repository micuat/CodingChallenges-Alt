// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Recursion
// Edited Video: https://www.youtube.com/watch?v=jPsZwrV9ld0

// instance mode by Naoto Hieda

var s = function (p) {

  p.setup = function () {
    p.createCanvas(600, 600);
  }

  p.draw = function () {
    p.background(0);
    p.stroke(255);
    p.noFill();
    p.drawCircle(300, 200, 600);
    p.noLoop();
  }

  p.drawCircle = function (x, y, d) {
    p.ellipse(x, y, d);
    if (d > 2) {
      let newD = d * 0.25;
      p.drawCircle(x + newD, y, newD);
      p.drawCircle(x - newD, y, newD);
      //drawCircle(x, y + d * 0.5, d * 0.5);
    }
  }

};

var myp5 = new p5(s);
