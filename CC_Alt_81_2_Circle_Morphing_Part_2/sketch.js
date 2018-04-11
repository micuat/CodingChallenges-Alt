// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Circle Morphing Part 2
// Edited Video: Coming Soon

// instance mode by Naoto Hieda

var cirPath = [];
var spacing = 1;

if (timer === undefined) {
  var timer;
}
else {
  clearInterval(timer);
}

var s = function (p) {
  p.polarToCartesian = function (r, angle) {
    // return p.createVector(r * p.cos(angle), r * p.sin(angle));
    return { x: r * p.cos(angle), y: r * p.sin(angle) }
  }

  p.setup = function () {
    p.createCanvas(800, 800);

    p.t = 0;
    p.seq = 0;
    p.seed = 6;
    timer = setInterval(function () {
      myp5.t += 0.01;
      if (myp5.t > 1) {
        myp5.t = 0;
        myp5.seq = (myp5.seq + 1) % 2;
        if(myp5.seq % 2 == 0) {
          myp5.seed = myp5.random([2, 6, 12]);
        }
      }
    }, 10);

    // p.angleMode(p.DEGREES);
    let radius = 300;
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
    p.background(255);
    p.translate(p.width / 2, p.height / 2);
    p.fill(0);
    p.ellipse(0, 0, 300 * 2);
    // p.rotate(p.radians(30));
    p.rotate(-p.millis() * 0.00025 * p.TWO_PI);
    p.stroke(255);
    p.strokeWeight(3);
    p.noFill();
    p.beginShape();
    let m = 360 / myp5.seed;
    for (let i = 0; i < cirPath.length; i++) {
      let v = cirPath[i];
      if (p.seq == 0 && (i % m >= p.t * m || i%m ==0)) {
        p.vertex(v.x, v.y);
      }
      else if (p.seq == 1 && (i % m <= p.t * m || i%m ==0)) {
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
