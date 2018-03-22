// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/RTc6i-7N3ms

// instance mode by Naoto Hieda

var end;
var start;
var base;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 400);

    start = new Segment(sketch, 300, 200, 50, 0);
    let current = start;

    for (let i = 0; i < 4; i++) {
      let next = new Segment(sketch, current, 50, i);
      current.child = next;
      current = next;

    }
    end = current;
    base = new p5.Vector(sketch.width / 2, sketch.height);
  }

  sketch.draw = function () {
    sketch.background(51);

    end.follow(sketch.mouseX, sketch.mouseY);
    end.update();

    let next = end.parent;
    while (next != null) {
      next.follow();
      next.update();
      next = next.parent;
    }

    start.setA(base);
    start.calculateB();
    next = start.child;
    while (next != null) {
      next.attachA();
      next.calculateB();
      next = next.child;
    }

    end.show();

    next = end.parent;
    while (next != null) {
      next.show();
      next = next.parent;
    }
  }

};

var myp5 = new p5(s);
