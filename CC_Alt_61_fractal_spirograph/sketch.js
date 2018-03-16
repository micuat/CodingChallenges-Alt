// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Fractal Spirograph
// Video: https://youtu.be/0dwJ-bkJwDI

// instance mode by Naoto Hieda

var path = [];

var angle = 0;
var resolution = 10;

var numChild = 4;

var sun;
var end;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sun = new Orbit(sketch, sketch.width / 2, sketch.height / 2, sketch.width / 4, 0);
    var next = sun;
    for (var i = 0; i < numChild; i++) {
      next = next.addChild();
    }
    end = next;
  }

  sketch.draw = function () {
    sketch.background(0);

    if(sketch.frameCount % 360 == 0) {
      sun = new Orbit(sketch, sketch.width / 2, sketch.height / 2, sketch.width / 4, 0);
      var next = sun;
      numChild = sketch.random(1, 5);
      for (var i = 0; i < numChild; i++) {
        next = next.addChild();
      }
      end = next;
    }

    let z = 0;//-(sketch.millis() * 0.001 % 20) * 100;
    sketch.translate(0, 0, z)

    for (var i = 0; i < resolution; i++) {
      var next = sun;
      let count = 0;
      while (next != null) {
        next.update();
        if(numChild - count < 3)
          path.push(sketch.createVector(next.x, next.y, z));
        next = next.child;
        count++;
      }
    }

    while(path.length > 10000) {
      path.shift();
    }

    sketch.translate(0, 0, -z)

    sketch.beginShape();
    sketch.stroke(255);
    sketch.noFill();
    for (var i in path) {
      let pos = path[i];
      sketch.stroke(sketch.map(pos.z, 0, -2000, 255, 100),20);
      sketch.vertex(pos.x, pos.y, pos.z);
    }
    sketch.endShape();
  }

};

var myp5 = new p5(s);