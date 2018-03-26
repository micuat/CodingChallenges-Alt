// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

function Node(sketch, val, x, y) {
  this.s = sketch;
  this.value = val;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
  this.level = 2;
  this.parent = null;

  // this.pos = this.s.createVector(this.s.random(this.s.width),
  // this.s.random(this.s.height/2, this.s.height))
  this.pos = this.s.createVector(this.value/255*this.s.width, this.s.height - 100);
  this.dest = this.s.createVector(this.x, this.y);
}

Node.prototype.search = function(val) {
  if (this.value == val) {
    return this;
  } else if (val < this.value && this.left != null) {
    return this.left.search(val);
  } else if (val > this.value && this.right != null) {
    return this.right.search(val);
  }
  return null;
}

Node.prototype.visit = function(parent) {
  let dest = this.s.createVector(this.x, this.y);
  this.didArrive = false;
  if(this.pos.dist(dest) < 0.1) this.didArrive = true;

  let everyoneHasArrived = this.didArrive;
  
  let p = 0.9;
  if(this.parent == null) {
    this.pos.lerp(dest, p);
  }
  else if(this.parent.didArrive) {
    // if(this.parent.left == null || this == this.parent.left) {
    //   this.pos.lerp(dest, p);
    // }
    // else if(this.parent.left.didArrive) {
      this.pos.lerp(dest, p);
    // }
  }


  if (this.left != null) {
    everyoneHasArrived = everyoneHasArrived && this.left.visit(this);
  }
  // console.log(this.value);
  this.s.fill(255, this.value, 0);
  this.s.noStroke();
  // this.s.textAlign(this.s.CENTER);
  // this.s.text(this.value, this.x, this.y);
  // this.s.stroke(255);
  // this.s.noFill();
  // this.s.ellipse(this.pos.x, this.pos.y, 20, 20);
  // this.s.line(parent.x, parent.y, this.x, this.y);
  if (this.right != null) {
    everyoneHasArrived = everyoneHasArrived && this.right.visit(this);
  }

  return everyoneHasArrived;
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
      this.left.x = this.x - this.s.width / this.s.pow(2, this.level);
      this.left.y = this.y + 50;
      this.left.level = this.level + 1;
      this.left.parent = this;
      return new Tentacle(this.s, this, this.left)
    } else {
      return this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + this.s.width / this.s.pow(2, this.level);
      this.right.y = this.y + 50;
      this.right.level = this.level + 1;
      this.right.parent = this;
      return new Tentacle(this.s, this, this.right)
    } else {
      return this.right.addNode(n);
    }
  }
}
