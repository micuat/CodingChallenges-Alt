// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

// instance mode by Naoto Hieda

var tentacles;

var pos;
var vel;
var gravity;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 600);
    pos = new p5.Vector(0, 0);
    vel = new p5.Vector(2, 1.3);
    gravity = new p5.Vector(0, 0.1);
    vel.mult(3);

    tentacles = [];

    let da = sketch.TWO_PI / 2;
    for (let a = 0; a < sketch.TWO_PI; a += da) {
      let x = sketch.width / 2 + sketch.cos(a) * 300;
      let y = sketch.height / 2 + sketch.sin(a) * 300;
      tentacles.push(new Tentacle(sketch, x, y));
    }
  }

  sketch.draw = function () {
    sketch.background(51);
    sketch.noFill();
    // sketch.ellipse(sketch.width / 2, sketch.height / 2, 400, 400);
    for (let i in tentacles) {
      let t = tentacles[i];
      t.update();
      t.show();
    }

    pos.add(vel);
    vel.add(gravity);
    sketch.noStroke();
    sketch.fill(100, 255, 0);
    sketch.ellipse(pos.x, pos.y, 32, 32);

    if (pos.x > sketch.width || pos.x < 0) {
      vel.x *= -1;
    }

    if (pos.y > sketch.height) {
      pos.y = sketch.height;
      vel.y *= -1;
      vel.mult(0.95);
    }
  }

};

var myp5 = new p5(s);
