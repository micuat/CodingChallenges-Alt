// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

function Blob(sketch, x, y, r) {
  this.pos = sketch.createVector(x, y);
  this.r = r;
  this.vel = sketch.createVector(0,0);

  this.update = function() {
    var newvel = sketch.createVector(sketch.mouseX-sketch.width/2, sketch.mouseY-sketch.height/2);
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
  }

  this.eats = function(other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = sketch.PI * this.r * this.r + sketch.PI * other.r * other.r;
      this.r = sketch.sqrt(sum / sketch.PI);
      //this.r += other.r;
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    sketch.fill(255);
    sketch.ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
  }
}
