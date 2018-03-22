// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/hbgDqyy8bIw

// instance mode by Naoto Hieda

var tentacle;
var px = 0, py = 0;
var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    let current = new Segment(sketch, 0, 0, 20, 0);

    for (let i = 0; i < 30; i++) {
      let next = new Segment(sketch, current, 20, i);
      current.child = next;
      current = next;

    }
    tentacle = current;
  }

  sketch.draw = function () {
    sketch.background(0);

    sketch.translate(sketch.width / 2, sketch.height / 2);

    let phase = sketch.millis() * 0.001 % 8;
    let x = 0;
    let y = 0;
    if (phase < 2) {
      let r = 300;
      let angle = sketch.millis() * 0.005;
      x = r * sketch.cos(angle);
      y = r * sketch.sin(angle);
    }
    else if (phase < 4) {
      let r = 300;
      let angle = sketch.millis() * 0.005;
      x = r * sketch.cos(angle);
      y = r * sketch.sin(angle * 2);
    }
    else if (phase < 6) {
      let r = 300;
      let angle = sketch.millis() * 0.01;
      r *= 2 - (phase % 2);
      x = r * sketch.cos(angle);
      y = r * sketch.sin(angle);
    }
    else {
      if(phase % 0.5 < 0.25) {
        x = -300;
      }
      else {
        x = 300;
      }
      if((phase-0.125) % 0.5 < 0.25) {
        y = 300;
      }
      else {
        y = -300;
      }
    }
    px = sketch.lerp(px, x, 0.2);
    py = sketch.lerp(py, y, 0.2);
    tentacle.follow(px, py);
    tentacle.update();
    tentacle.show();

    let next = tentacle.parent;
    while (next != null) {
      next.follow();
      next.update();
      next.show();
      next = next.parent;
    }
  }

};

var myp5 = new p5(s);
