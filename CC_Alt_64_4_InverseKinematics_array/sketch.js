// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

// instance mode by Naoto Hieda

var tentacles;

function Ball (sketch) {
  this.s = sketch;
  this.pos = new p5.Vector(sketch.random(sketch.width), sketch.random(sketch.height/4, sketch.height*0.75));
  this.vel = new p5.Vector(2, 1.3);//p5.Vector.random2D();
  this.vel.mult(2);

  this.isTaken = false;
}

Ball.prototype.update = function () {
  this.isTaken = false;

  this.pos.add(this.vel);
  if (this.pos.x > this.s.width || this.pos.x < 0) {
    this.vel.x *= -1;
  }

  if (this.pos.y > this.s.height) {
    this.pos.sub(this.vel);
    // this.pos.y = this.s.height;
    this.vel.y *= -1;
    // this.vel.mult(0.9);
  }
  this.vel.add(gravity);
}

Ball.prototype.show = function () {
  // this.s.noStroke();
  // this.s.fill(255, 100);
  // this.s.ellipse(this.pos.x, this.pos.y, 32, 32);
}

var balls = [];
var gravity;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    gravity = new p5.Vector(0, 0.5);
    for (let i = 0; i < 16; i++) {
      balls.push(new Ball(sketch));
    }

    tentacles = [];

    for (let i = 0; i < 32; i++) {
      let x = sketch.map(i, 0, 31, 0, sketch.width);
      let y = 0;// + sketch.sin(a) * 300;
      tentacles.push(new Tentacle(sketch, x, y, x, sketch.height, i));
    }
  }

  sketch.draw = function () {    
    sketch.background(0);

    for (let i in balls) {
      let ball = balls[i];
      ball.update();
      ball.show();
    }

    sketch.noFill();

    // sketch.ellipse(sketch.width / 2, sketch.height / 2, 400, 400);
    for (let i in tentacles) {
      let t = tentacles[i];
      t.update();
      t.show();
    }
  }

};

var myp5 = new p5(s);
