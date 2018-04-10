// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 1
// Edited Video: Coming Soon

// instance mode by Naoto Hieda

let cirPath = [];
let triPath = [];
let spacing = 10;
let theta = 0;

var s = function (p) {

  p.polarToCartesian = function (r, angle) {
    return p.createVector(r * p.cos(angle), r * p.sin(angle));
  }

  p.setup = function () {
    p.createCanvas(400, 400);
    p.angleMode(p.DEGREES);
    let radius = 100;
    let startA = 0;
    let endA = 120;
    let start = p.polarToCartesian(radius, startA);
    let end = p.polarToCartesian(radius, endA);
    for (let a = startA; a < 360; a += spacing) {
      let cv = p.polarToCartesian(radius, a);
      cirPath.push(cv);
      let amt = (a % 120) / (endA - startA);
      let tv = p5.Vector.lerp(start, end, amt);
      triPath.push(tv);

      if ((a + spacing) % 120 === 0) {
        startA = startA + 120;
        endA = endA + 120;
        start = p.polarToCartesian(radius, startA);
        end = p.polarToCartesian(radius, endA);
      }
    }

  }

  p.draw = function () {
    p.background(220);
    p.translate(p.width / 2, p.height / 2);
    p.rotate(30);
    p.stroke(0);
    p.strokeWeight(4);
    p.noFill();
    let amt = (p.sin(theta) + 1) / 2;
    theta += 5;
    p.beginShape();
    for (let i = 0; i < cirPath.length; i++) {
      let cv = cirPath[i];
      let tv = triPath[i];
      let x = p.lerp(cv.x, tv.x, amt);
      let y = p.lerp(cv.y, tv.y, amt);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);


    // p.beginShape();
    // for (let i = 0; i < cirPath.length; i++) {
    //   let v = cirPath[i];
    //   p.vertex(v.x, v.y);
    // }
    // p.endShape(p.CLOSE);
    // p.beginShape();
    // for (let i = 0; i < triPath.length; i++) {
    //   let v = triPath[i];
    //   p.vertex(v.x, v.y);
    // }
    // p.endShape(p.CLOSE);

    // for (let i = 0; i < triPath.length; i++) {
    //   let v = triPath[i];
    //   p.fill(0);
    //   p.ellipse(v.x, v.y, 8);
    // }

  }

};

var myp5 = new p5(s);
