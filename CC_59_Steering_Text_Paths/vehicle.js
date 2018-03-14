// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

function Vehicle(sketch, x, y) {
  this.sketch = sketch;
  this.pos = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
  this.target = sketch.createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = sketch.createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
}

Vehicle.prototype.behaviors = function() {
  let sketch = this.sketch;
  var arrive = this.arrive(this.target);
  var mouse = sketch.createVector(sketch.mouseX, sketch.mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function() {
  let sketch = this.sketch;
  sketch.stroke(255);
  sketch.strokeWeight(this.r);
  sketch.point(this.pos.x, this.pos.y);
}


Vehicle.prototype.arrive = function(target) {
  let sketch = this.sketch;
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = sketch.map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  let sketch = this.sketch;
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return sketch.createVector(0, 0);
  }
}
