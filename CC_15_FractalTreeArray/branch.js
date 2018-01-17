// instance mode by Naoto Hieda

function Branch(sketch, begin, end) {
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.jitter = function() {
    this.end.x += sketch.random(-1, 1);
    this.end.y += sketch.random(-1, 1);
  }

  this.show = function() {
    sketch.stroke(255);
    sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  this.branchA = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(sketch.PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(sketch, this.end, newEnd);
    return b;
  }
  this.branchB = function() {
    var dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(-sketch.PI / 4);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(sketch, this.end, newEnd);
    return b;
  }



}
