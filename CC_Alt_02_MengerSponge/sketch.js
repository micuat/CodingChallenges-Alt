// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

// instance mode by Naoto Hieda

var s = function (sketch) {

  var a = 0;

  var sponge = [];

  sketch.setup = function () {
    this.pos = sketch.createVector(0, 0, 0);

    sketch.createCanvas(800, 800, sketch.WEBGL);

    // An array of Box objects
    // Star with one
    var b = new Box(sketch, 0, 0, 0, 400, 0);
    sponge.push(b);

    // sketch.mousePressed();
    // sketch.mousePressed();
    // sketch.mousePressed();
  }

  sketch.mousePressed = function () {
    // Generate the next set of boxes
    var next = [];
    for (var i = 0; i < sponge.length; i++) {
      var b = sponge[i];
      var newBoxes = [];
      if(this.pos.z > b.pos.z && this.pos.dist(b.pos) < 50 * (5 - b.generation) ) {// if(sketch.random(1) > 0.9) {
        newBoxes = b.generate();
      }

      if(newBoxes.length > 0)
        next = next.concat(newBoxes);
      else
        next = next.concat(b);
    }
    sponge = next;
    isRunning = false;
  }

  sketch.draw = function () {
    sketch.smooth();
    sketch.lights();
    sketch.colorMode(sketch.RGB, 255);
    sketch.background(0);
    this.pos.z = sketch.map(sketch.sin(sketch.millis() * 0.0001), -1, 1, 0, 600);
    sketch.translate(0, 0, 600);
    sketch.translate(this.pos.x, this.pos.y, -this.pos.z);

    if(sketch.frameCount % 60 == 0) sketch.mousePressed();
    // sketch.rotateX(a);
    // sketch.rotateY(a * 0.4);
    // sketch.rotateZ(a * 0.1);
    // Show what you've got!
    for (var i = 0; i < sponge.length; i++) {
      // sponge[i].color = this.pos.dist(sponge[i].pos);
      sponge[i].show();
    }
    a += 0.01;
  }
};

var myp5 = new p5(s);