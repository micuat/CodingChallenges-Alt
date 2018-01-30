// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

function Particle(sketch, x, y, hu, firework) {
  this.pos = sketch.createVector(x, y);
  this.firework = firework;
  this.lifespan = 255;
  this.hu = hu;
  this.acc = sketch.createVector(0, 0);
  
  if (this.firework) {
    this.vel = sketch.createVector(0, sketch.random(-12, -8));
  } else {
    this.vel = p5.Vector.random2D();
    this.vel.mult(sketch.random(2, 10));
  }
 
  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.update = function() {
    if (!this.firework) {
      this.vel.mult(0.9);
      this.lifespan -= 4;
    }
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  this.done = function() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    sketch.colorMode(sketch.HSB);
    
    if (!this.firework) {
      sketch.strokeWeight(2);
      sketch.stroke(hu, 255, 255, this.lifespan);
    } else {
      sketch.strokeWeight(4);
      sketch.stroke(hu, 255, 255);
    }
    
    sketch.point(this.pos.x, this.pos.y);
  }
}
