// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jrk_lOg_pVA

// instance mode by Naoto Hieda

function Particle(sketch, x, y) {
  this.sketch = sketch;
  toxi.physics2d.VerletParticle2D.call(this, x, y);
}

Particle.prototype = Object.create(toxi.physics2d.VerletParticle2D.prototype);
Particle.prototype.constructor = toxi.physics2d.VerletParticle2D;
Particle.prototype.display = function () {
  this.sketch.fill(255);
  this.sketch.ellipse(this.x, this.y, 10, 10);
} 
