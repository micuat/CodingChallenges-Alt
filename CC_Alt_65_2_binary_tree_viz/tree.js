// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

function Tree(sketch) {
  this.s = sketch;
  this.root = null;
}

Tree.prototype.traverse = function () {
  return this.root.visit(this.root);
}

Tree.prototype.search = function (val) {
  var found = this.root.search(val);
  return found;
}

Tree.prototype.addValue = function (val) {
  var n = new Node(this.s, val);
  if (this.root == null) {
    this.root = n;
    this.root.x = this.s.width / 2;
    this.root.y = this.s.height / 6;
  } else {
    return this.root.addNode(n);
  }
}
