// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY

function Particle(sketch, x, y) {
  this.pos = sketch.createVector(x, y);
  this.prev = sketch.createVector(x, y);
  this.vel = sketch.createVector(); //p5.Vector.random2D();
  //this.vel = p5.Vector.random2D();
  //this.vel.setMag(random(2, 5));
  this.acc = sketch.createVector();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.show = function() {
    sketch.stroke(255, 255);
    sketch.strokeWeight(4);
    sketch.line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;

  }

  this.attracted = function(target) {
    // var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var d = force.mag();
    d = sketch.constrain(d, 1, 25);
    var G = 50;
    var strength = G / (d * d);
    force.setMag(strength);
    if (d < 20) {
      force.mult(-10);
    }
    this.acc.add(force);
  }

}
