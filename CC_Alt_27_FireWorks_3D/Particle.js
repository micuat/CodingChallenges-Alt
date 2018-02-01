// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: 

function Particle(sketch) {
  this.location;
  this.velocity;
  this.acceleration;
  this.lifespan = sketch.random(100, 500);

  this.seed = false;
  this.points = [];

  if (arguments.length == 5) {
    let x = arguments[1];
    let y = arguments[2];
    let z = arguments[3];
    let h = arguments[4];

    this.acceleration = sketch.createVector(0, 0);
    this.velocity = sketch.createVector(0, sketch.random(2, 5), 0);
    this.location = sketch.createVector(x, y, z);
    this.seed = true;
  }

  if (arguments.length == 3) {
    let l = arguments[1];
    let h = arguments[2];

    this.acceleration = sketch.createVector(0, 0);
    this.velocity = p5.Vector.random3D();
    this.velocity.mult(sketch.random(2, 4));
    this.location = l.copy();
  }

  this.prevLocation = this.location.copy();
  this.origin = this.location.copy();

  this.applyForce = function (force) {
    this.acceleration.add(force);
  }

  this.run = function () {
    this.update();
    this.display();
  }

  this.explode = function () {
    if (this.seed && this.velocity.y < 0) {
      this.lifespan = 0;
      return true;
    }
    return false;
  }

  // Method to update location
  this.update = function () {
    this.prevLocation = this.location.copy();

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    if (!this.seed) {
      this.lifespan -= 2;
      this.velocity.mult(0.99);
    }
    this.acceleration.mult(0);

    this.points.push(this.location.copy());
    if(this.points.length > 100) this.points.shift();
  }

  // Method to display
  this.display = function () {
    if (this.seed) {
      sketch.strokeWeight(2);
    } else {
      sketch.strokeWeight(1);
    }

    for(let i = 0; i < this.points.length-1; i++) {
      sketch.stroke(255, sketch.map(i, 0, this.points.length, 0, this.lifespan*2));
      let p = this.points[i];
      let q = this.points[i+1];
      sketch.line(p.x, p.y, p.z, q.x, q.y, q.z);
    }
    // sketch.line(this.location.x, this.location.y, this.location.z,
    //   this.prevLocation.x, this.prevLocation.y, this.prevLocation.z);
    //ellipse(location.x, location.y, 12, 12);
  }

  // Is the particle still useful?
  this.isDead = function () {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}