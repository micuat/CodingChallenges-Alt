// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JcopTKXt8L8

// instance mode by Naoto Hieda

function Branch() {
  var sketch = arguments[0];
  if(arguments.length == 3) {
    var v = arguments[1];
    var d = arguments[2];
    this.parent = null;
    this.pos = v.copy();
    this.dir = d.copy();
    this.saveDir = this.dir.copy();
  }
  else if(arguments.length == 2) {
    var p = arguments[1];
    this.parent = p;
    this.pos = this.parent.next();
    this.dir = this.parent.dir.copy();
    this.saveDir = this.dir.copy();
  }
  this.count = 0;
  this.len = 5;

  this.reset = function() {
    this.dir = this.saveDir.copy();
    this.count = 0;
  }


  this.next = function() {
    var v = p5.Vector.mult(this.dir, this.len);
    var next = p5.Vector.add(this.pos, v);
    return next;
  }
}
