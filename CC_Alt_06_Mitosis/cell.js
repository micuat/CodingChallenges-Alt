// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jxGS3fKPKJA

function Cell(sketch, pos, vel, r, c) {

  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = sketch.createVector(sketch.random(100, sketch.width-100), sketch.random(100, sketch.height-100));
  }

  if (vel) {
    this.vel = vel.copy();
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(0.1);
  }

  this.r = r || 120;
  this.c = c || sketch.color(255, 100);

  this.clicked = function(x, y) {
    var d = sketch.dist(this.pos.x, this.pos.y, x, y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.mitosis = function() {
    if(this.r < 5) return [];
    //this.pos.x += random(-this.r, this.r);
    var v = p5.Vector.random2D();
    v.mult(this.r * 0.1);
    var vi = v.copy();
    v.add(this.vel);

    var cell0 = new Cell(sketch, this.pos, v, this.r*0.8, this.c);
    vi.mult(-1);
    vi.add(this.vel);
    var cell1 = new Cell(sketch, this.pos, vi, this.r*0.8, this.c);
    return [cell0, cell1];
  }

  this.move = function() {
    var v = p5.Vector.random2D();
    v.mult(0.1 * this.r / 60);
    this.vel.add(v);
    // var vc = sketch.createVector(-this.pos.x + sketch.width / 2, -this.pos.y + sketch.height / 2);
    // vc.mult(0.0001);
    // this.vel.add(vc);
    this.pos.add(this.vel);
    this.vel.mult(0.9);
  }

  this.show = function() {
    sketch.noStroke();
    sketch.fill(this.c);
    sketch.ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }

}