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
  this.life = 180;

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.life--;
  }

  this.show = function() {
    if(this.life > 170) sketch.stroke(sketch.map(this.life, 180, 170, 0, 255));
    else sketch.stroke(sketch.map(this.life, 170, 30, 255, 0));
    sketch.point(this.pos.x, this.pos.y);
    // sketch.stroke(255, 255);
    // sketch.strokeWeight(4);
    // sketch.line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;

  }

  this.attracted = function(target) {
    // var dir = target - this.pos
    var force = p5.Vector.sub(target, this.pos);
    var d = force.mag();
    d = sketch.constrain(d, 1, 50);
    var G = 50;
    var strength = G / (d * d);
    force.setMag(strength);
    if (d < 30) {
      force.mult(-50);
    }
    this.acc.add(force);
  }

}
