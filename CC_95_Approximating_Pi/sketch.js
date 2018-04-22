// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Approximating Pi
// https://youtu.be/5cNnf_7e92Q

// instance mode by Naoto Hieda

var s = function (p) {

  let r = 200;

  let total = 0;
  let circle = 0;

  let recordPI = 0;

  p.setup = function () {
    p.createCanvas(402, 402);
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
    p.stroke(255);
    p.strokeWeight(4);
    p.noFill();
    p.ellipse(0, 0, r * 2, r * 2);
    p.rectMode(p.CENTER);
    p.rect(0, 0, r * 2, r * 2);
  }

  p.draw = function () {
    p.translate(p.width / 2, p.height / 2);

    for (let i = 0; i < 10000; i++) {
      let x = p.random(-r, r);
      let y = p.random(-r, r);
      total++;

      let d = x * x + y * y;
      if (d < r * r) {
        circle++;
        p.stroke(100, 255, 0, 100);
      } else {
        p.stroke(0, 100, 255, 100);
      }
      p.strokeWeight(1);
      p.point(x, y);

      let pi = 4 * (circle / total);
      let recordDiff = Math.abs(Math.PI - recordPI);
      let diff = Math.abs(Math.PI - pi);
      if (diff < recordDiff) {
        recordDiff = diff;
        recordPI = pi;
        print(recordPI);
      }
    }
  }

};

var myp5 = new p5(s);
