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
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  this.s.fill(255);
  this.s.noStroke();
  this.s.textAlign(this.s.CENTER);
  this.s.text(this.value, this.x, this.y);
  this.s.stroke(255);
  this.s.noFill();
  this.s.ellipse(this.x, this.y, 20, 20);
  this.s.line(parent.x, parent.y, this.x, this.y);
  if (this.right != null) {
    this.right.visit(this);
  }
}

Node.prototype.addNode = function(n) {
  if (n.value < this.value) {
    if (this.left == null) {
      this.left = n;
      this.left.x = this.x - 50;
      this.left.y = this.y + 20;
    } else {
      this.left.addNode(n)
    }
  } else if (n.value > this.value) {
    if (this.right == null) {
      this.right = n;
      this.right.x = this.x + 50;
      this.right.y = this.y + 20;
    } else {
      this.right.addNode(n);
    }
  }
}
