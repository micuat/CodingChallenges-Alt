// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY

// instance mode by Naoto Hieda

var attractors = [];
var particles = [];

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.initAttractors();
  }

  sketch.mousePressed = function () { }
  sketch.initAttractors = function () {
    attractors = [];
    let angleOffset = sketch.random(sketch.TWO_PI);
    for (var i = 0; i < 16; i++) {
      let p = p5.Vector.random2D();
      if (sketch.random(1) < 0.8) {
        p.mult(200);
      }
      else {
        p.mult(100);
      }
      p.x += sketch.width * 0.5;
      p.y += sketch.height * 0.5;
      attractors.push(p);
    }

  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.stroke(255);
    sketch.strokeWeight(6);

    if (sketch.frameCount % 60 == 0 && sketch.frameCount % 240 != 180) {
      sketch.initAttractors();
      for (let i = 0; i < 100; i++) {
        let p = p5.Vector.random2D();
        p.mult(400);
        p.x += sketch.width * 0.5;
        p.y += sketch.height * 0.5;
        particles.push(new Particle(sketch, p.x, p.y));
      }
    }
    else if (sketch.frameCount % 240 == 180) {
      attractors = [];
    }

    while (particles.length > 300) {
      particles.splice(0, 1);
    }

    for (var i = 0; i < attractors.length; i++) {
      sketch.stroke(255);
      // sketch.point(attractors[i].x, attractors[i].y);
    }
    sketch.stroke(255);
    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];
      for (var j = 0; j < attractors.length; j++) {
        particle.attracted(attractors[j]);
      }
      particle.update();
      particle.show();
    }

  }

};

var myp5 = new p5(s);
