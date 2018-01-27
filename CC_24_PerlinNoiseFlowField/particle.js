// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

function Particle(sketch) {
  this.pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
  this.vel = sketch.createVector(0, 0);
  this.acc = sketch.createVector(0, 0);
  this.maxspeed = 4;
  this.h = 0;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    // print(vectors.length, x, y, cols, index, this.pos)
    var x = sketch.floor(this.pos.x / scl);
    var y = sketch.floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[(index+cols*rows)%(cols*rows)];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    sketch.stroke(this.h, 255, 255, 25);
    this.h = this.h + 1;
    if (this.h > 255) {
      this.h = 0;
    }
    sketch.strokeWeight(1);
    sketch.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  this.edges = function() {
    if (this.pos.x > sketch.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = sketch.width;
      this.updatePrev();
    }
    if (this.pos.y > sketch.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = sketch.height;
      this.updatePrev();
    }

  }

}
