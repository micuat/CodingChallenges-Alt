// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/CKeyIbT3vXI

// instance mode by Naoto Hieda

var gravity;

var s = function (sketch) {

  var fireworks = [];

  gravity = sketch.createVector(0, -0.01);

  var cam;

  sketch.setup = function () {
    if (sketch.isLiveJs) {
      // cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
      sketch.createCanvas(800, 800);
    }
    else {
      sketch.createCanvas(800, 800, sketch.WEBGL);
    }
    sketch.colorMode(sketch.RGB);
    sketch.background(0);
  }

  sketch.draw = function () {

    if (sketch.frameCount % 120 == 0) {
      fireworks.push(new Firework(sketch, sketch.random(-sketch.width/2, sketch.width/2), -sketch.height, sketch.random(-800, 800)));
    }

    sketch.background(0);
    sketch.rotateY(sketch.frameCount * 0.001);
    sketch.translate(sketch.width / 2, sketch.height, -400);

    // Floor
    // sketch.stroke(255);
    // sketch.strokeWeight(1);
    // sketch.fill(51);
    // sketch.beginShape();
    // sketch.vertex(-sketch.width, sketch.height / 2, -800);
    // sketch.vertex(sketch.width, sketch.height / 2, -800);
    // sketch.vertex(sketch.width, sketch.height / 2, 800);
    // sketch.vertex(-sketch.width, sketch.height / 2, 800);
    // sketch.endShape(sketch.CLOSE);


    for (let i = fireworks.length - 1; i >= 0; i--) {
      let f = fireworks[i];
      f.run();
      if (f.done()) {
        fireworks.splice(i, 1);
      }
    }
  }

};

var myp5 = new p5(s);
