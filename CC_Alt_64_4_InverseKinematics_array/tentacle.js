// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

function Tentacle(sketch, x, y, ex, ey, index) {
  this.sketch = sketch;
  this.segments = new Array(80);
  this.base;
  this.len = 10;
  this.defaultTarget = new p5.Vector(ex, ey);
  this.index = index;

  this.base = new p5.Vector(x, y);
  this.segments[0] = new Segment(sketch, 300, 200, this.len, 0);
  for (let i = 1; i < this.segments.length; i++) {
    this.segments[i] = new Segment(sketch, this.segments[i - 1], this.len, i);
  }

  this.target = sketch.createVector();
}

Tentacle.prototype.update = function () {
  let total = this.segments.length;
  let end = this.segments[total - 1];

  let closestBall = balls[0];
  let closestDist = balls[0].pos.dist(end.b);
  for (let i = 1; i < balls.length; i++) {
    let ball = balls[i];
    let dist = ball.pos.dist(end.b);
    if (dist < closestDist){// && ball.isTaken == false) {
      closestDist = dist;
      closestBall = ball;
    }
  }
  // if (closestBall.isTaken == false) {
    // closestBall.isTaken = true;
    this.target.lerp(closestBall.pos, 0.5);
  // }
  // else {
  //   this.target.lerp(this.defaultTarget, 0.01);
  // }

  // if(didSomeoneTakeIt == false) {
  //   this.target.lerp(ball.pos, 0.99);
  // }
  // else {
  //   this.target.lerp(ball.pos, 0.1);
  // }
  end.follow(this.target.x, this.target.y);
  end.update();

  for (let i = total - 2; i >= 0; i--) {
    this.segments[i].follow(this.segments[i + 1]);
    this.segments[i].update();
  }

  this.segments[0].setA(this.base);

  for (let i = 1; i < total; i++) {
    this.segments[i].setA(this.segments[i - 1].b);
  }

  // if(p5.Vector.sub(ball.pos, end.b).mag() < 4) end.haveIt = true;
  // else end.haveIt = false;

  if (end.haveIt) didSomeoneTakeIt = true;
}

Tentacle.prototype.show = function () {
  let total = this.segments.length;
  let end = this.segments[total - 1];
  this.sketch.stroke(255, this.index * 8, 0, 100);
  // if (end.haveIt) this.sketch.stroke(255);
  // else this.sketch.stroke(100);
  for (let i in this.segments) {
    this.segments[i].show();
  }
}
