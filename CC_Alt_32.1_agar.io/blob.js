// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

function Blob(sketch, x, y, r) {
  this.pos = sketch.createVector(x, y);
  this.r = r;
  this.vel = sketch.createVector(0,0);
  this.angle = 0;

  this.update = function() {
    let closestIndex = 0;
    let closestDistance = this.pos.dist(blobs[0].pos);
    for(let i = 1; i < blobs.length; i++) {
      let dist = this.pos.dist(blobs[i].pos);
      if(dist < closestDistance) {
        closestIndex = i;
        closestDistance = dist;
      }
    }
    var newvel = blobs[closestIndex].pos.copy();
    newvel.sub(this.pos);
    // var newvel = sketch.createVector(sketch.mouseX-sketch.width/2, sketch.mouseY-sketch.height/2);
    newvel.setMag(10 / 64 * this.r);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);

    this.angle = sketch.lerp(this.angle, this.vel.heading(), 0.05);
  }

  this.brown = function() {
    let v = p5.Vector.random2D();
    v.setMag(this.r / 32);
    this.vel.add(v);
    this.pos.add(this.vel);
    this.vel.mult(0.9);

    this.angle = sketch.lerp(this.angle, this.vel.heading(), 0.05);
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
    sketch.fill(0);
    sketch.push();
    sketch.translate(this.pos.x, this.pos.y);
    sketch.rotate(this.angle + sketch.PI);
    sketch.ellipse(this.r * 0.9, 0, this.r*0.2, this.r*0.2);
    sketch.rotate(sketch.PI * 0.08);
    sketch.ellipse(this.r * 0.9, 0, this.r*0.1, this.r*0.1);
    sketch.pop();
  }
}
