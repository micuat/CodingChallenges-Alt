// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

function Tentacle(sketch, x, y) {
  this.sketch = sketch;
  this.segments = new Array(5);
  this.base;
  this.len = 50;

  this.base = new p5.Vector(x, y);
  this.segments[0] = new Segment(sketch, 300, 200, this.len, 0);
  for (let i = 1; i < this.segments.length; i++) {
    this.segments[i] = new Segment(sketch, this.segments[i - 1], this.len, i);
  }
}

Tentacle.prototype.update = function () {
  let total = this.segments.length;
  let end = this.segments[total - 1];
  end.follow(pos.x, pos.y);
  end.update();

  for (let i = total - 2; i >= 0; i--) {
    this.segments[i].follow(this.segments[i + 1]);
    this.segments[i].update();
  }

  this.segments[0].setA(this.base);

  for (let i = 1; i < total; i++) {
    this.segments[i].setA(this.segments[i - 1].b);
  }
}

Tentacle.prototype.show = function () {
  for (let i in this.segments) {
    this.segments[i].show();
  }
}
