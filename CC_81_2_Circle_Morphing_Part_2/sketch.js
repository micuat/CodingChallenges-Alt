// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 2
// Edited Video: Coming Soon

// instance mode by Naoto Hieda

var cirPath = [];
var spacing = 2;

var s = function (p) {
  p.polarToCartesian = function (r, angle) {
    // return p.createVector(r * p.cos(angle), r * p.sin(angle));
    return {x: r * p.cos(angle), y: r * p.sin(angle)}
  }

  p.setup = function () {
    p.createCanvas(400, 400);
    // p.angleMode(p.DEGREES);
    let radius = 200;
    let i = 0;
    for (let a = 0; a < 360; a += spacing) {
      let cv = p.polarToCartesian(radius, p.radians(a));
      cv.active = true;
      if (a % 120 == 0) {
        cv.fixed = true;
      }
      cirPath.push(cv);

    }
  }

  p.draw = function () {


    p.background(220);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(p.radians(30));
    p.stroke(0);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < cirPath.length; i++) {
      let v = cirPath[i];
      if (v.active) {
        p.vertex(v.x, v.y);
      }
    }
    p.endShape(p.CLOSE);

    let activeList = [];
    for (let i = 0; i < cirPath.length; i++) {
      let v = cirPath[i];
      if (v.active && !v.fixed) {
        activeList.push(v);
      }
    }

    let index = 0; //floor(random(activeList.length));
    let v = activeList[index];
    if (v) {
      v.active = false;
    }

  }

};

var myp5 = new p5(s);
