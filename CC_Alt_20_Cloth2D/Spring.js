// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jrk_lOg_pVA

// instance mode by Naoto Hieda

function Spring(sketch, a, b) {
  this.sketch = sketch;
  toxi.physics2d.VerletSpring2D.call(this, a, b, w, 1);
}

Spring.prototype = Object.create(toxi.physics2d.VerletSpring2D.prototype);
Spring.prototype.constructor = toxi.physics2d.VerletSpring2D;
Spring.prototype.display = function () {
  this.sketch.line(this.a.x, this.a.y, this.b.x, this.b.y);
} 
