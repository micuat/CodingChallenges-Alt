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
var prevP = 0;
var curP = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.colorMode(sketch.RGB, 255);
    cols = sketch.floor(sketch.width / scl);
    rows = sketch.floor(sketch.height / scl);
    // fr = sketch.createP('');

    flowfield = new Array(cols * rows);

    for (var i = 0; i < 100; i++) {
      particles[i] = new Particle(sketch);
    }
  }

  sketch.draw = function () {
    // sketch.background(0);
    sketch.blendMode(sketch.BLEND);
    // sketch.stroke(255);
    // sketch.fill(0, 100);
    // sketch.rect(0, 0, sketch.width, sketch.height);
    let p = 0;
    if(sketch.millis() * 0.00005 % 1 > 0.5) p = 1;
    if(p != prevP)
      sketch.background(0);
    prevP = p;
    curP = curP * 0.99 + 0.01 * p;

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var n0 = sketch.noise(xoff, yoff, zoff) * sketch.TWO_PI * 4;
        var n1 = sketch.atan2(y-rows/2, x-cols/2) - sketch.PI/2 - 0.2;
        var n = n0 * p + n1 * (1-p);
        var angle = n;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        if(flowfield[index] == null)
          flowfield[index] = sketch.createVector(0, 0);
        v.lerp(flowfield[index], 0.9);
        flowfield[index] = v;
        xoff += inc;
        sketch.stroke(0, 50);
      }
      yoff += inc;

      zoff += 0.0003;
    }

    // sketch.rotateX(sketch.PI/6);
    // sketch.translate(sketch.width/2, sketch.height/2);
    // sketch.rotateZ(sketch.millis() * 0.0001);
    // sketch.translate(-sketch.width/2, -sketch.height/2);
    // sketch.stroke(255, 100);
    // sketch.noFill();
    // sketch.strokeWeight(2);
    // for (var y = 0; y < rows-1; y++) {
    //   sketch.beginShape(sketch.TRIANGLE_STRIP);
    //   for (var x = 0; x < cols; x++) {
    //     var index = x + y * cols;
    //     // sketch.stroke(flowfield[index].y * 255)
    //     sketch.vertex(x * cols, y * rows, flowfield[index].x * 55);
        
    //     var index = x + (y+1) * cols;
    //     // sketch.stroke(flowfield[index].y * 255)
    //     sketch.vertex(x * cols, (y+1) * rows, flowfield[index].x * 55);
    //   }
    //   sketch.endShape();
    // }
    for (var i = 0; i < particles.length; i++) {
      sketch.stroke(255, 25);
      sketch.strokeWeight(1);
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();
    }
  }

};

var myp5 = new p5(s);
