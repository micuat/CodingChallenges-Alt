// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

// instance mode by Naoto Hieda

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    sketch.colorMode(sketch.HSB, 255);
    cols = sketch.floor(sketch.width / scl);
    rows = sketch.floor(sketch.height / scl);
    // fr = sketch.createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 300; i++) {
      particles[i] = new Particle(sketch);
    }
    sketch.background(51);
  }

  sketch.draw = function () {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI * 4;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
        sketch.stroke(0, 50);
        // push();
        // translate(x * scl, y * scl);
        // rotate(v.heading());
        // strokeWeight(1);
        // line(0, 0, scl, 0);
        // pop();
      }
      yoff += inc;

      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }

    // fr.html(floor(frameRate()));
  }

};

var myp5 = new p5(s);
