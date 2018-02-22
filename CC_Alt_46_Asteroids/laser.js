// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

function Laser(sketch, spos, angle) {
  this.pos = sketch.createVector(spos.x, spos.y);
  this.vel = sketch.createVector(0, 0);
  this.acc = sketch.createVector(0, 0);

  this.trace = [];

  this.update = function () {
    this.trace.push(this.pos.copy());
    if(this.trace.length > 10) this.trace.shift();

    if (asteroids.length == 0) return;

    let closestDistance = 1000;
    let closest = 0;
    for (let i in asteroids) {
      let x = sketch.random(-30, 30);
      let y = sketch.random(-30, 30);
      let d = sketch.dist(this.pos.x + x, this.pos.y + y, asteroids[i].pos.x, asteroids[i].pos.y);
      if (d < closestDistance) {
        closestDistance = d;
        closest = i;
      }
    }
    this.acc = asteroids[closest].pos.copy();
    this.acc.sub(this.pos);
    this.acc.setMag(1);
    this.vel.add(this.acc);
    this.vel.mult(0.99);
    this.pos.add(this.vel);

    // this.pos.x = sketch.lerp(this.pos.x, asteroids[closest].pos.x, 0.1);
    // this.pos.y = sketch.lerp(this.pos.y, asteroids[closest].pos.y, 0.1);
  }

  this.render = function () {
    sketch.push();
    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.ellipse(this.pos.x, this.pos.y, 3);
    for (let i in this.trace) {
      sketch.stroke(255, i * 255 / this.trace.length);
      sketch.ellipse(this.trace[i].x, this.trace[i].y, 3);
    }

    sketch.pop();
  }

  this.hits = function (asteroid) {
    var d = sketch.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function () {
    if (this.pos.x > sketch.width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > sketch.height || this.pos.y < 0) {
      return true;
    }
    return false;
  }


}
