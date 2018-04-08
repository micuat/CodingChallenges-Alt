// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Simple Particle System
// Edited Video: https://www.youtube.com/watch?v=UcdigVaIYAk

// instance mode by Naoto Hieda

particles = [];

var s = function (p) {

  p.setup = function () {
    p.createCanvas(600, 400);
  }

  p.draw = function () {
    p.background(0);
    for (let i = 0; i < 5; i++) {
      let p = new Particle();
      particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].show();
      if (particles[i].finished()) {
        // remove this particle
        particles.splice(i, 1);
      }
    }
  }

};

var myp5 = new p5(s);

function Particle() {

  this.x = 300;
  this.y = 380;
  this.vx = myp5.random(-1, 1);
  this.vy = myp5.random(-5, -1);
  this.alpha = 255;
}

Particle.prototype.finished = function () {
  return this.alpha < 0;
}

Particle.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= 5;
}

Particle.prototype.show = function () {
  myp5.noStroke();
  //stroke(255);
  myp5.fill(255, this.alpha);
  myp5.ellipse(this.x, this.y, 16);
}
