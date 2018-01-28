// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

function Particle(sketch) {
  this.pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
  this.vel = sketch.createVector(0, 0);
  this.acc = sketch.createVector(0, 0);
  this.maxspeed = 4;

  this.prevPos = this.pos.copy();
  this.points = [];
  this.wrapped = false;

  this.update = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // this.vel.mult(0.7);
    this.pos.z = this.acc.z * 55;
    this.acc.mult(0);
  }

  this.follow = function(vectors) {
    // print(vectors.length, x, y, cols, index, this.pos)
    var x = sketch.floor(this.pos.x / scl);
    var y = sketch.floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[(index+cols*rows)%(cols*rows)];
    this.applyForce(force);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
    this.acc.z = force.x;
  }

  this.show = function() {
    this.updatePrev();
    // let v = this.points[this.points.length - 1].v;
    // sketch.point(v.x, v.y, v.z);
    for(let i = 0; i < this.points.length - 1; i++) {
      if(this.points[i+1].wrapped == false) {
        let v = this.points[i].v;
        sketch.point(v.x, v.y, v.z);
      }
    }
  }

  this.updatePrev = function(wrapped) {
    this.points = [];
    let n = 32;
    for(let i = 0; i < 32; i++) {
      let point = {
        v: null,
        wrapped: false
      }
      let v = this.pos.copy();
      if(this.wrapped == false) {
        // v.lerp(lastp.v, i / n);
        v.x = v.x * i / n + this.prevPos.x * (n-i) / n;
        v.y = v.y * i / n + this.prevPos.y * (n-i) / n;
      }

      let amp = (1-curP) * .5 + 0.1;
      v.x += sketch.randomGaussian() * amp * this.vel.x;
      v.y += sketch.randomGaussian() * amp * this.vel.y;

      point.v = v;
      this.points.push(point);
    }
    this.prevPos = this.pos.copy();

    while(this.points.length > 1000) {
      this.points.shift();
    }
    if(wrapped)
      this.wrapped = true;
    else
      this.wrapped = false;
  }

  this.edges = function() {
    if (this.pos.x > sketch.width) {
      this.pos.x = 0;
      this.updatePrev(true);
    }
    if (this.pos.x < 0) {
      this.pos.x = sketch.width;
      this.updatePrev(true);
    }
    if (this.pos.y > sketch.height) {
      this.pos.y = 0;
      this.updatePrev(true);
    }
    if (this.pos.y < 0) {
      this.pos.y = sketch.height;
      this.updatePrev(true);
    }

  }

}
