// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/RTc6i-7N3ms

// instance mode by Naoto Hieda

var end;
var start;
var base;
var px = 0;
var py = 0;
var pointsArray = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    start = new Segment(sketch, 300, 200, 10, 0);
    let current = start;

    for (let i = 0; i < 90; i++) {
      let next = new Segment(sketch, current, 10, i);
      current.child = next;
      current = next;

    }
    end = current;
    base = new p5.Vector(-sketch.width / 2, 0);
  }

  sketch.draw = function () {
    sketch.background(0);
    // sketch.scale(2, 1);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.rotate(sketch.PI/2);
    // sketch.scale(1, 2);

    sketch.stroke(255, 255);

    let r = 300 + 200 * sketch.abs(sketch.cos(sketch.millis() * 0.0005));
    let x = 600 + 100 * sketch.abs(sketch.sin(sketch.millis() * 0.0005));
    x -= sketch.width / 2;
    // let y = r * (sketch.sin(sketch.millis() * 0.02)>0?1:-1);
    let y = 0;
    if (sketch.millis() * 0.001 % 4 < 4) {
      y = r * sketch.sin(sketch.millis() * 0.015);
    }
    else {
      y = 200 * (sketch.sin(sketch.millis() * 0.02) > 0 ? 1 : -1);
    }
    px = sketch.lerp(px, x, 0.2);
    py = sketch.lerp(py, y, 0.2);
    end.follow(px, py);
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

    // end.show();

    // next = end.parent;
    // while (next != null) {
    //   next.show();
    //   next = next.parent;
    // }
    let points = [];
    points.push({ x: end.b.x, y: end.b.y, col: end.col })

    next = end.parent;
    while (next != null) {
      points.push({ x: next.b.x, y: next.b.y, col: next.col })
      next = next.parent;
    }

    pointsArray.push(points);
    if (pointsArray.length > 100) pointsArray.shift();

    for (let j = 0; j < pointsArray.length; j++) {
      let points = pointsArray[j];
      for (let i = 0; i < points.length - 1; i++) {
        let p = points[i];
        let pn = points[i + 1];
        if(j < pointsArray.length/2)
          sketch.stroke(255, sketch.map(j, 0, pointsArray.length/2, 0, p.col));
        else
          sketch.stroke(255, sketch.map(j, pointsArray.length/2, 0, 0, p.col));
        sketch.line(p.x, p.y, pn.x, pn.y)
      }
    }
  }

};

var myp5 = new p5(s);
