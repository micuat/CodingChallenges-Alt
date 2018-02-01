// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: 

// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles 

function Firework (sketch) {

  this.particles = [];    // An arraylist for all the particles
  this.firework;
  this.hu;

  this.hu = sketch.random(255);
  this.firework = new Particle(sketch, sketch.random(-sketch.width/2, sketch.width/2), sketch.height/2, sketch.random(-800, 800), this.hu);
  
  this.done = function () {
    if (this.firework == null && this.particles.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  this.run = function () {
    if (this.firework != null) {
      sketch.fill(this.hu,255,255);
      this.firework.applyForce(gravity);
      this.firework.update();
      this.firework.display();

      if (this.firework.explode()) {
        for (let i = 0; i < 750; i++) {
          this.particles.push(new Particle(sketch, this.firework.location, this.hu));    // Add "num" amount of particles to the arraylist
        }
        this.firework = null;
      }
    }

    for (let i = this.particles.length-1; i >= 0; i--) {
      let p = this.particles[i];
      p.applyForce(gravity);
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }


  // A method to test if the particle system still has particles
  this.dead = function () {
    if (this.particles.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}