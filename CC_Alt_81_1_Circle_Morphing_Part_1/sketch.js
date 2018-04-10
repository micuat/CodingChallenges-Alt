// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 1
// Edited Video: Coming Soon

// instance mode by Naoto Hieda

var cirPath = [];
var triPath = [];
var spacing = 10;
var theta = 0;
if(timer === undefined) {
  var timer;
}
else {
  clearInterval(timer);
}

var s = function (p) {

  p.polarToCartesian = function (r, angle) {
    return p.createVector(r * p.cos(angle), r * p.sin(angle));
  }

  p.setup = function () {
    p.t = 0;
    p.seq = 0;
    timer = setInterval(function () {
      myp5.t += 0.02;
      if (myp5.t > 1) {
        myp5.t = 0;
        myp5.seq = (myp5.seq + 1) % 4;
      }
    }, 20);
    p.createCanvas(800, 800);
    // p.angleMode(p.DEGREES);
    let radius = 200;
    let startA = 0;
    let endA = 120;
    let start = p.polarToCartesian(radius, p.radians(startA));
    let end = p.polarToCartesian(radius, p.radians(endA));
    for (let a = startA; a < 360; a += spacing) {
      let cv = p.polarToCartesian(radius, p.radians(a));
      cirPath.push(cv);
      let amt = (a % 120) / (endA - startA);
      let tv = p5.Vector.lerp(start, end, amt);
      triPath.push(tv);

      if ((a + spacing) % 120 === 0) {
        startA = startA + 120;
        endA = endA + 120;
        start = p.polarToCartesian(radius, p.radians(startA));
        end = p.polarToCartesian(radius, p.radians(endA));
      }
    }

  }

  p.draw = function () {
    p.background(255);
    p.translate(p.width / 2, p.height / 2);

    for (let i = -2; i <= 1; i++) {
      for (let j = -2; j <= 1; j++) {
        p.push();
        p.translate(j * 200 * p.sqrt(3), i * 300);
        if((i+10) % 2 == 1) {
          p.translate(100 * p.sqrt(3), 0);
        }
        p.rotate(p.radians(30));

        if (p.seq == 1 && p.t > 0.5){//} && i == 0 && j == 0) {
          p.rotate(p.t * p.TWO_PI * 2 / 3);
          let sc = p.cos(p.t * p.TWO_PI * 2);
          sc = p.map(sc, -1, 1, 0.75, 1);
          p.scale(sc, sc);
        }
        if (p.seq == 3 && p.t > 0.5){// && i == 0 && j == 0) {
          p.rotate(-p.t * p.TWO_PI * 2 / 3);
          let sc = p.cos(p.t * p.TWO_PI * 2);
          sc = p.map(sc, -1, 1, 0.75, 1);
          p.scale(sc, sc);
        }

        p.stroke(0);
        p.strokeWeight(4);
        p.noFill();
        theta = p.t * p.TWO_PI;
        let amt = 1 - (p.sin(theta) + 1) / 2 / 2;
        p.beginShape();
        for (let i = 0; i < cirPath.length; i++) {
          let th = -p.cos(i / cirPath.length * 6 * p.PI);
          th = p.map(th, -1, 1, 0, 8);
          th = p.lerp(8, th, amt);
          // p.strokeWeight(th);
          let cv = cirPath[i];
          let tv = triPath[i];
          let x = p.lerp(cv.x, tv.x, amt);
          let y = p.lerp(cv.y, tv.y, amt);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
        p.pop();
      }
    }
  }

};

var myp5 = new p5(s);
