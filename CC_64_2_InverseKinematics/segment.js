// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/hbgDqyy8bIw

function Segment() {
  this.a;
  this.angle = 0;
  this.len;
  this.b = new p5.Vector();
  this.parent = null;
  this.child = null;
  this.sw = 0;

  this.sketch = arguments[0];
  if (arguments.length == 5) {
    //Segment(float x, float y, float len_, float i) {
    let x = arguments[1];
    let y = arguments[2];
    let len_ = arguments[3];
    let i = arguments[4];
    this.a = new p5.Vector(x, y);
    this.sw = this.sketch.map(i, 0, 20, 1, 10);
    this.len = len_;
    this.calculateB();
  }

  if (arguments.length == 4) {
    // Segment(Segment parent_, float len_, float i) {
    let parent_ = arguments[1];
    let len_ = arguments[2];
    let i = arguments[3];
    this.parent = parent_;
    this.sw = this.sketch.map(i, 0, 20, 1, 10);
    this.a = parent_.b.copy();
    this.len = len_;
    this.calculateB();
  }
}

Segment.prototype.follow = function (tx, ty) {
  if (tx === undefined) {
    let targetX = this.child.a.x;
    let targetY = this.child.a.y;
    this.follow(targetX, targetY);
  }
  else {
    let target = new p5.Vector(tx, ty);
    let dir = p5.Vector.sub(target, this.a);
    this.angle = dir.heading();
    dir.setMag(this.len);
    dir.mult(-1);
    this.a = p5.Vector.add(target, dir);
  }
}

Segment.prototype.calculateB = function () {
  let dx = this.len * this.sketch.cos(this.angle);
  let dy = this.len * this.sketch.sin(this.angle);
  this.b.set(this.a.x + dx, this.a.y + dy);
}

Segment.prototype.update = function () {
  this.calculateB();
}


Segment.prototype.show = function () {
  this.sketch.stroke(255);
  this.sketch.strokeWeight(this.sw);
  this.sketch.line(this.a.x, this.a.y, this.b.x, this.b.y);
}
