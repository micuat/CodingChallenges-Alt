// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

// instance mode by Naoto Hieda

var s = function (sketch) {

  var a = 0;

  var sponge = [];

  sketch.setup = function () {
    sketch.createCanvas(400, 400, sketch.WEBGL);

    // An array of Box objects
    // Star with one
    var b = new Box(sketch, 0, 0, 0, 200);
    sponge.push(b);
  }

  sketch.mousePressed = function () {
    // Generate the next set of boxes
    var next = [];
    for (var i = 0; i < sponge.length; i++) {
      var b = sponge[i];
      var newBoxes = b.generate();
      next = next.concat(newBoxes);
    }
    sponge = next;
  }

  sketch.draw = function () {
    sketch.background(51);
    sketch.hint(sketch.DISABLE_DEPTH_TEST);
    sketch.rotateX(a);
    sketch.rotateY(a * 0.4);
    sketch.rotateZ(a * 0.1);
    // Show what you've got!
    for (var i = 0; i < sponge.length; i++) {
      sponge[i].show();
    }
    a += 0.01;
  }
};

var myp5 = new p5(s);