// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: 

function Particle(sketch) {
  this.location;
  this.velocity;
  this.acceleration;
  this.lifespan;

  this.seed = false;

  this.hu;

  if (arguments.length == 5) {
    let x = arguments[1];
    let y = arguments[2];
    let z = arguments[3];
    let h = arguments[4];

    this.hu = h;

    this.acceleration = sketch.createVector(0, 0);
    this.velocity = sketch.createVector(0, sketch.random(-25, -10), 0);
    this.location = sketch.createVector(x, y, z);
    this.seed = true;
    this.lifespan = 255.0;
  }

  if (arguments.length == 3) {
    let l = arguments[1];
    let h = arguments[2];

    this.hu = h;
    this.acceleration = sketch.createVector(0, 0);
    this.velocity = p5.Vector.random3D();
    this.velocity.mult(sketch.random(8, 16));
    this.location = l.copy();
    this.lifespan = 255.0;
  }

  this.applyForce = function (force) {
    this.acceleration.add(force);
  }

  this.run = function () {
    this.update();
    this.display();
  }

  this.explode = function () {
    if (this.seed && this.velocity.y > 0) {
      this.lifespan = 0;
      return true;
    }
    return false;
  }

  // Method to update location
  this.update = function () {

    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    if (!this.seed) {
      this.lifespan -= 5;
      this.velocity.mult(0.9);
    }
    this.acceleration.mult(0);
  }

  // Method to display
  this.display = function () {
    sketch.stroke(this.hu, 255, 255, this.lifespan);
    if (this.seed) {
      sketch.strokeWeight(4);
    } else {
      sketch.strokeWeight(2);
    }
    sketch.push();
    sketch.translate(this.location.x, this.location.y, this.location.z);
    if(sketch.isLiveJs)
      sketch.point(0, 0);
    else
      sketch.rect(0, 0, 1, 1);
    sketch.pop();
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