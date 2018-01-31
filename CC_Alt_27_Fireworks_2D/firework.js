// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

function Firework(sketch, x, vy, vLimit) {
  this.hu = sketch.random(255);
  this.firework = new Particle(sketch, x, sketch.height, this.hu, vy);
  this.exploded = false;
  this.particles = [];
  this.vLimit = vLimit;

  this.done = function() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      
      if (this.firework.vel.y >= this.vLimit) {
        this.exploded = true;
        this.explode();
      }
    }
    
    for (var i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      let f = p5.Vector.random2D();
      f.mult(0.5);
      this.particles[i].applyForce(f);
      this.particles[i].update();
      
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  this.explode = function() {
    for (var i = 0; i < 100; i++) {
      var p = new Particle(sketch, this.firework.pos.x, this.firework.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

  this.show = function() {
    if (!this.exploded) {
      this.firework.show();
    }
    
    sketch.stroke(255);
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
