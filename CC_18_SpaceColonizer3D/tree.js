// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

// instance mode by Naoto Hieda

function Tree(sketch) {
  this.closeEnough = function (b) {
    for (var i = 0; i < this.leaves.length; i++) {
      var d = p5.Vector.dist(b.pos, this.leaves[i].pos);
      if (d < max_dist) {
        return true;
      }
    }
    return false;
  }

  this.leaves = [];
  this.branches = [];

  var n = 200;
  if(sketch.isLiveJs) n = 2000;
  for (var i = 0; i < n; i++) {
    this.leaves.push(new Leaf(sketch));
  }
  var pos = sketch.createVector(0, sketch.height);
  var dir = sketch.createVector(0, -1);
  var root = new Branch(sketch, pos, dir);
  this.branches.push(root);
  var current = new Branch(sketch, root);

  while (!this.closeEnough(current)) {
    var trunk = new Branch(sketch, current);
    this.branches.push(trunk);
    current = trunk;
  }

  this.grow = function() {
    for (var i = 0; i < this.leaves.length; i++) {
      var l = this.leaves[i];
      var closest = null;
      var closestDir = null;
      var record = -1;

      for (var j = 0; j < this.branches.length; j++) {
        var b = this.branches[j];
        var dir = p5.Vector.sub(l.pos, b.pos)
        var d = dir.mag();
        if (d < min_dist) {
          l.reached = true;
          closest = null;
          break;
        } else if (d > max_dist) {
        } else if (closest == null || d < record) {
          closest = b;
          closestDir = dir;
          record = d;
        }
      }

      if (closest != null) {
        closestDir.normalize();
        closest.dir.add(closestDir);
        closest.count++;
      }
    }

    for (var i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1);
      }
    }

    for (var i = this.branches.length - 1; i >= 0; i--) {
      var b = this.branches[i];
      if (b.count > 0) {
        b.dir.div(b.count);
        var rand = p5.Vector.random2D();
        rand.setMag(0.3);
        b.dir.add(rand);
        b.dir.normalize();
        var newB = new Branch(sketch, b);
        this.branches.push(newB);
        b.reset();
      }
    }
  }

  this.show = function() {
    for (var i = 0; i < this.leaves.length; i++) {
      this.leaves[i].show();
    }

    for (var i = 0; i < this.branches.length; i++) {
      var b = this.branches[i];
      if (b.parent != null) {
        var sw = sketch.map(i, 0, this.branches.length, 6, 0);
        sketch.strokeWeight(sw);
        sketch.stroke(255);
        sketch.line(b.pos.x, b.pos.y, b.pos.z, b.parent.pos.x, b.parent.pos.y, b.parent.pos.z);
      }
    }
  }
}
