// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

function Laser(sketch, spos, angle) {
  this.pos = sketch.createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    sketch.push();
    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.point(this.pos.x, this.pos.y);
    sketch.pop();
  }

  this.hits = function(asteroid) {
    var d = sketch.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() {
    if (this.pos.x > sketch.width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > sketch.height || this.pos.y < 0) {
      return true;
    }
    return false;
  }


}
