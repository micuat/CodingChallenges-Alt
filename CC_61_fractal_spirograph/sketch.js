// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI

// instance mode by Naoto Hieda

var path = [];

var angle = 0;
var resolution = 50;

var sun;
var end;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    sun = new Orbit(sketch, sketch.width / 2, sketch.height / 2, sketch.width / 4, 0);
    var next = sun;
    for (var i = 0; i < 10; i++) {
      next = next.addChild();
    }
    end = next;
  }

  sketch.draw = function () {
    sketch.background(51);

    for (var i = 0; i < resolution; i++) {
      var next = sun;
      while (next != null) {
        next.update();
        next = next.child;
      }
      path.push(sketch.createVector(end.x, end.y));
    }

    var next = sun;
    while (next != null) {
      next.show();
      next = next.child;
    }

    sketch.beginShape();
    sketch.stroke(255, 0, 255);
    sketch.noFill();
    for (var i in path) {
      let pos = path[i];
      sketch.vertex(pos.x, pos.y);
    }
    sketch.endShape();
  }

};

var myp5 = new p5(s);