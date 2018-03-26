// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

function Segment() {
  this.a;
  this.angle = 0;
  this.len;
  this.b = new p5.Vector();
  this.sw = 0;

  this.sketch = arguments[0];
  this.tentacle = arguments[1];
  if (arguments.length == 6) {
    //Segment(float x, float y, float len_, float i) {
    let x = arguments[2];
    let y = arguments[3];
    let len_ = arguments[4];
    let i = arguments[5];
    this.a = new p5.Vector(x, y);
    this.sw = this.sketch.map(i, 0, 20, 1, 10);
    this.len = len_;
    this.calculateB();
  }

  if (arguments.length == 5) {
    // Segment(Segment parent_, float len_, float i) {
    let parent_ = arguments[2];
    let len_ = arguments[3];
    let i = arguments[4];
    this.sw = this.sketch.map(i, 0, 20, 1, 10);
    this.a = parent_.b.copy();
    this.len = len_;
    this.calculateB();
  }
}

Segment.prototype.setA = function (pos) {
  this.a = pos.copy();
  this.calculateB();
}

Segment.prototype.follow = function () {
  if (arguments.length == 1) {
    let child = arguments[0];
    let targetX = child.a.x;
    let targetY = child.a.y;
    this.follow(targetX, targetY);
  }
  else if (arguments.length == 2) {
    let tx = arguments[0];
    let ty = arguments[1];
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
  // this.sketch.stroke(255);
  this.sketch.strokeWeight(10/this.tentacle.parent_node.level);
  this.sketch.line(this.a.x, this.a.y, this.b.x, this.b.y);
}
