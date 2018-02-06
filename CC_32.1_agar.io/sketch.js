// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

// instance mode by Naoto Hieda

var blob;

var blobs = [];
var zoom = 1;


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    blob = new Blob(sketch, 0, 0, 64);
    for (var i = 0; i < 200; i++) {
      var x = sketch.random(-sketch.width, sketch.width);
      var y = sketch.random(-sketch.height, sketch.height);
      blobs[i] = new Blob(sketch, x, y, 16);
    }
  }

  sketch.draw = function () {
    sketch.background(0);

    sketch.translate(sketch.width / 2, sketch.height / 2);
    var newzoom = 64 / blob.r;
    zoom = sketch.lerp(zoom, newzoom, 0.1);
    sketch.scale(zoom);
    sketch.translate(-blob.pos.x, -blob.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
      blobs[i].show();
      if (blob.eats(blobs[i])) {
        blobs.splice(i, 1);
      }
    }


    blob.show();
    blob.update();

  }

};

var myp5 = new p5(s);
