// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Recursion
// Edited Video: https://www.youtube.com/watch?v=jPsZwrV9ld0

// instance mode by Naoto Hieda

var pg;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    pg = p.createGraphics(40, 40);
    pg.beginDraw();
    pg.background(0, 255, 0);
    pg.endDraw();

    // p.rectMode(p.CENTER);
  }

  p.draw = function () {
    pg.beginDraw();
    pg.background(0, p.floor(p.millis() * 1) % 255, 0);
    pg.endDraw();

    p.background(0);
    p.noStroke();
    p.fill(255);
    // p.lights();
    // p.translate(0, 0, -1500);
    // p.rotateX(-p.PI / 6);
    p.drawCircle(0, 0, 80);
    // p.drawCircle(p.width / 2, p.height / 2, 0, 100);
    // p.noLoop();
  }

  p.drawCircle = function (x, y, d) {
    p.push();
    p.translate(x, y);

    p.stroke(255, 20);
    p.fill(x / 4, 20);
    // p.rect(0, 0, d, d)
    p.beginShape();
    let tri = p.constrain(p.map(p.cos(p.millis() * 0.001 / 2), -0.1, 0.1, 0.5, 1), 0.5, 1);
    p.vertex(0, 0);
    p.vertex(d * tri, d - d * tri);
    p.vertex(d, d);
    p.vertex(0, d);
    p.vertex(0, 0);
    p.endShape();
    p.pop();

    if (d > 20 && y < 800) {
      let newD = d * p.map(p.sin(p.millis() * 0.001), -1, 1, 1, 0.98);
      let dx = d;//(newD + d) * p.cos(0.4);
      // z += (newD + d) * p.sin(0.4);
      p.push();
      p.drawCircle(x + newD, y + d, newD);
      p.drawCircle(x - 0, y + d, newD);
      p.pop();
      //drawCircle(x, y + d * 0.5, d * 0.5);
    }
  }

};

var myp5 = new p5(s);
