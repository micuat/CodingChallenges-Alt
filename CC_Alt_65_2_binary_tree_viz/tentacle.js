// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/10st01Z0jxc

function Tentacle(sketch, parent_node, child_node) {
  this.sketch = sketch;
  let dx = parent_node.x - child_node.x;
  let dy = parent_node.y - child_node.y;
  let dist = this.sketch.sqrt(dx*dx + dy*dy);
  
  this.len = 10;
  this.segments = new Array(parseInt(dist / this.len * sketch.random(1.5, 3)));
  this.base;

  this.parent_node = parent_node;
  this.child_node = child_node;

  this.base = new p5.Vector(parent_node.pos.x, parent_node.pos.y);
  this.segments[0] = new Segment(sketch, this, 300, 200, this.len, 0);
  for (let i = 1; i < this.segments.length; i++) {
    this.segments[i] = new Segment(sketch, this, this.segments[i - 1], this.len, i);
  }

  this.followPos = sketch.createVector(this.child_node.pos.x, this.child_node.pos.y);
}

Tentacle.prototype.update = function () {
  let nb = new p5.Vector(this.parent_node.pos.x, this.parent_node.pos.y);
  this.base.lerp(nb, 0.1);

  let total = this.segments.length;
  let end = this.segments[total - 1];

  this.followPos.lerp(this.sketch.createVector(this.child_node.pos.x, this.child_node.pos.y), 0.1)
  end.follow(this.followPos.x, this.followPos.y);
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
  let scol = this.parent_node.value;
  let ccol = this.child_node.value;
  for (let i in this.segments) {
    this.sketch.stroke(255, this.sketch.lerp(scol, ccol, i / this.segments.length), 0);
    this.segments[i].show();
  }
}
