// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Steering Evolution
// Another version:
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week2-evolution/01_evolve_steering

// Part 1: https://youtu.be/flxOkx0yLrY
// Part 2: https://youtu.be/XaOVH8ZSRNA
// Part 3: https://youtu.be/vZUWTlK7D2Q
// Part 4: https://youtu.be/ykOcaInciBI
// Part 5: https://youtu.be/VnFF5V5DS8s

var mr = 0.01;

function Vehicle(sketch, x, y, dna) {
  this.s = sketch;
  this.acceleration = this.s.createVector(0, 0);
  this.velocity = this.s.createVector(0, -2);
  this.position = this.s.createVector(x, y);
  this.r = 4;
  this.maxspeed = 5;
  this.maxforce = 0.5;

  this.health = 1;

  this.dna = [];
  if (dna === undefined) {
    // Food weight
    this.dna[0] = this.s.random(-2, 2);
    // Poison weight
    this.dna[1] = this.s.random(-2, 2);
    // Food perception
    this.dna[2] = this.s.random(0, 100);
    // Poision Percepton
    this.dna[3] = this.s.random(0, 100);
  } else {
    // Mutation
    this.dna[0] = dna[0];
    if (this.s.random(1) < mr) {
      this.dna[0] += this.s.random(-0.1, 0.1);
    }
    this.dna[1] = dna[1];
    if (this.s.random(1) < mr) {
      this.dna[1] += this.s.random(-0.1, 0.1);
    }
    this.dna[2] = dna[2];
    if (this.s.random(1) < mr) {
      this.dna[2] += this.s.random(-10, 10);
    }
    this.dna[3] = dna[3];
    if (this.s.random(1) < mr) {
      this.dna[3] += this.s.random(-10, 10);
    }
  }

  // Method to update location
  this.update = function() {

    this.health -= 0.005;

    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  this.behaviors = function(good, bad) {
    var steerG = this.eat(good, 0.2, this.dna[2]);
    var steerB = this.eat(bad, -1, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  this.clone = function() {
    if (this.s.random(1) < 0.002) {
      return new Vehicle(this.s, this.position.x, this.position.y, this.dna);
    } else {
      return null;
    }
  }

  this.eat = function(list, nutrition, perception) {
    var record = Infinity;
    var closest = null;
    for (var i = list.length - 1; i >= 0; i--) {
      var d = this.position.dist(list[i]);

      if (d < this.maxspeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else {
        if (d < record && d < perception) {
          record = d;
          closest = list[i];
        }
      }
    }

    // This is the moment of eating!

    if (closest != null) {
      return this.seek(closest);
    }

    return this.s.createVector(0, 0);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
    //this.applyForce(steer);
  }

  this.dead = function() {
    return (this.health < 0)
  }

  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + this.s.PI / 2;

    this.s.push();
    this.s.translate(this.position.x, this.position.y);
    this.s.rotate(angle);

    var gr = this.s.color(255, 255, 0);
    var rd = this.s.color(255, 0, 0);
    var col = this.s.lerpColor(rd, gr, this.health);

    this.s.fill(col, 100);
    this.s.ellipse(0, 0, this.r * 4);
    // this.s.ellipse(0, 0, this.r * 2);
    // this.s.stroke(col);
    // this.s.strokeWeight(1);
    // this.s.beginShape();
    // this.s.vertex(0, -this.r * 2);
    // this.s.vertex(-this.r, this.r * 2);
    // this.s.vertex(this.r, this.r * 2);
    // this.s.endShape(this.s.CLOSE);

    this.s.pop();
  }


  this.boundaries = function() {
    var d = 25;

    var desired = null;

    if (this.position.x < d) {
      desired = this.s.createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > this.s.width - d) {
      desired = this.s.createVector(-this.maxspeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = this.s.createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > this.s.height - d) {
      desired = this.s.createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}
