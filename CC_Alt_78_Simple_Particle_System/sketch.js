// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Simple Particle System
// Edited Video: https://www.youtube.com/watch?v=UcdigVaIYAk

// instance mode by Naoto Hieda

particles = [];
count = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
  }

  p.draw = function () {
    p.background(0);
    let step = p.floor(p.frameCount / 90) % 3;
    if (step == 0) {
      for (let i = 0; i < 5; i++) {

        let p = new Particle();
        particles.push(p);
      }
    }
    else if (step == 1) {
      for (let i = 0; i < 1; i++) {
        let p = new ParticleA();
        particles.push(p);
      }
    }
    else {
      for (let i = 0; i < 5; i++) {
        let p = new ParticleB();
        particles.push(p);
      }
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

  this.x = myp5.width / 2;
  this.y = myp5.height * 0.5;
  let v = p5.Vector.random2D();
  v.mult(6);
  this.vx = v.x;
  this.vy = v.y;
  this.alpha = 255;
}

Particle.prototype.finished = function () {
  return this.alpha < 0;
}

Particle.prototype.update = function () {
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= 4;
}

Particle.prototype.show = function () {
  myp5.noStroke();
  myp5.fill(255, this.alpha);
  myp5.ellipse(this.x, this.y, 16);
}


function ParticleA() {
  this.x = myp5.width / 2;
  this.y = myp5.height * 0.5;
  let v = myp5.createVector(1, 0);
  v.mult(1);
  v.rotate(myp5.millis() * 0.02)
  this.vx = v.x;
  this.vy = v.y;
  this.alpha = 255;
}


ParticleA.prototype = Object.create(Particle.prototype, {
  update: {
    value: function () {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= 2;
    }
  }
});

ParticleA.prototype.constructor = ParticleA;

function ParticleB() {
  this.x = myp5.width / 2;
  this.y = myp5.random(1)>0.5?myp5.height:0.0;
  let v = p5.Vector.random2D();
  v.mult(1);
  this.vx = myp5.randomGaussian() * 5;
  this.vy = myp5.random(1, 2) * 5 * (this.y>1?-1:1);
  this.alpha = 255;
}


ParticleB.prototype = Object.create(Particle.prototype, {
});

ParticleB.prototype.constructor = ParticleB;