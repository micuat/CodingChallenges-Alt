// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

function Asteroid(sketch, pos, r, alpha) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height))
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = sketch.random(15, 50);
  }

  this.vel = p5.Vector.random2D();
  this.total = sketch.floor(sketch.random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = sketch.random(-this.r * 0.5, this.r * 0.5);
  }

  if (alpha) {
    this.alpha = alpha;
  }
  else {
    this.alpha = 0;
  }

  this.rot = 0;
  this.rotVel = sketch.random(-0.01, 0.01);

  this.update = function() {
    this.pos.add(this.vel);
    if(this.alpha < 255) {
      this.alpha += 5;
    }
  }

  this.render = function() {
    // for (var i = 0; i < this.total; i++) {
    //   this.offset[i] += sketch.noise(i * 0.5, sketch.frameCount * 0.01) - 0.5;
    // }

    sketch.push();
    sketch.stroke(255, this.alpha);
    sketch.noFill();
    sketch.translate(this.pos.x, this.pos.y);
    sketch.rotate(this.rot);
    this.rot += this.rotVel;
    //ellipse(0, 0, this.r * 2);
    sketch.beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = sketch.map(i, 0, this.total, 0, sketch.TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * sketch.cos(angle);
      var y = r * sketch.sin(angle);
      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  this.breakup = function() {
    var newA = [];
    newA[0] = new Asteroid(sketch, this.pos, this.r, 255);
    newA[1] = new Asteroid(sketch, this.pos, this.r, 255);
    return newA;
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

}
