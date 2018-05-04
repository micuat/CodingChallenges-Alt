// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

function Cell(pos, r, c) {

  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = p006.createVector(p006.random(p006.width), p006.random(p006.height));
  }

  this.r = r || 60;
  this.c = c || p006.color(p006.random(100, 255), 0, p006.random(100, 255), 100);

  this.clicked = function(x, y) {
    var d = p006.dist(this.pos.x, this.pos.y, x, y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.mitosis = function() {
    //this.pos.x += random(-this.r, this.r);
    var cell = new Cell(this.pos, this.r*0.8, this.c);
    return cell;
  }

  this.move = function() {
    var vel = p5.Vector.random2D();
    this.pos.add(vel);
  }

  this.show = function() {
    p006.noStroke();
    p006.fill(this.c);
    p006.ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }

}