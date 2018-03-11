// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY

// instance mode by Naoto Hieda

var attractors = [];
var particles = [];

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);

    // for (var i = 0; i < 10; i++) {
    //   attractors.push(createVector(random(width), random(height)));
    // }
  }

  sketch.mousePressed = function () {
    attractors.push(sketch.createVector(sketch.mouseX, sketch.mouseY));
  }

  sketch.draw = function () {
    sketch.background(51);
    sketch.stroke(255);
    sketch.strokeWeight(4);
    particles.push(new Particle(sketch, sketch.random(sketch.width), sketch.random(sketch.height)));

    if (particles.length > 100) {
      particles.splice(0, 1);
    }

    for (var i = 0; i < attractors.length; i++) {
      sketch.stroke(0, 255, 0);
      sketch.point(attractors[i].x, attractors[i].y);
    }
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
