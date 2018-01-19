// instance mode by Naoto Hieda

function Branch(sketch, begin, end, level) {
  this.begin = begin;
  this.end = end;
  this.finished = false;
  this.level = level;

  this.points = [this.begin];
  this.dir = p5.Vector.sub(this.end, this.begin);
  this.curDir = this.dir.copy();
  this.curDir.mult(30 / 1000);

  this.jitter = function() {
    this.end.x += sketch.random(-1, 1)*5;
    this.end.y += sketch.random(-1, 1)*5;
  }

  this.show = function() {
    sketch.stroke(255);
    var last = this.points[this.points.length - 1];
    if(this.level == curLevel) {
      this.curDir.rotate(sketch.randomGaussian() * 0.1);
      var x = last.x + this.curDir.x;
      var y = last.y + this.curDir.y;
      // var x = sketch.lerp(this.begin.x, this.end.x, curTime) + 5 * sketch.random(-1, 1);
      // var y = sketch.lerp(this.begin.y, this.end.y, curTime) + 5 * sketch.random(-1, 1);
      this.points.push(sketch.createVector(x, y));
      this.end = this.points[this.points.length - 1];
    }
    // else {
    //   sketch.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    // }
    for(var i = 0; i < this.points.length - 1; i++)
    sketch.line(this.points[i].x, this.points[i].y,
      this.points[i+1].x, this.points[i+1].y);
  }

  this.branchA = function() {
    var dir = this.dir.copy();
    dir.rotate(sketch.PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(sketch, this.end, newEnd, this.level+1);
    return b;
  }
  this.branchB = function() {
    var dir = this.dir.copy();
    dir.rotate(-sketch.PI / 6);
    dir.mult(0.67);
    var newEnd = p5.Vector.add(this.end, dir);
    var b = new Branch(sketch, this.end, newEnd, this.level+1);
    return b;
  }



}
