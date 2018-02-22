// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

function Ship(sketch) {
  this.pos = sketch.createVector(sketch.width / 2, sketch.height / 2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = sketch.createVector(0, 0);
  this.isBoosting = false;

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  this.boost = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  this.hits = function(asteroid) {
    var d = sketch.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.render = function() {
    sketch.push();
    sketch.translate(this.pos.x, this.pos.y);
    sketch.rotate(this.heading + sketch.PI / 2);
    sketch.fill(0);
    sketch.stroke(255);
    sketch.triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    sketch.pop();
  }

  this.edges = function() {
    if (this.pos.x > sketch.width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = sketch.width + this.r;
    }
    if (this.pos.y > sketch.height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = sketch.height + this.r;
    }
  }

  this.setRotation = function(a) {
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

}
