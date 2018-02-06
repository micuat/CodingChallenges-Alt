// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

// instance mode by Naoto Hieda

var blob;

var blobs = [];
var zoom = 1;

var shader;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    blob = new Blob(sketch, 0, 0, 64);
    for (var i = 0; i < 200; i++) {
      var x = sketch.random(-sketch.width, sketch.width) * blob.r / 32;
      var y = sketch.random(-sketch.height, sketch.height) * blob.r / 32;
      blobs[i] = new Blob(sketch, x, y, sketch.random(10, blob.r));
    }
    shader = sketch.loadShader("../../CC_Alt_32.1_agar.io/blur.glsl");
  }

  sketch.draw = function () {
    sketch.background(0);

    if(sketch.frameCount % 60 == 0)
      shader = sketch.loadShader("../../CC_Alt_32.1_agar.io/blur.glsl");

    sketch.translate(sketch.width / 2, sketch.height / 2);
    var newzoom = 64 / blob.r;
    zoom = sketch.lerp(zoom, newzoom, 0.1);
    sketch.scale(zoom);
    sketch.translate(-blob.pos.x, -blob.pos.y);
    blob.update();

    for (var i = blobs.length - 1; i >= 0; i--) {
      blobs[i].brown();
      blobs[i].show();
      if (blob.eats(blobs[i])) {
        blobs.splice(i, 1);
      }
    }

    if(blob.r > 10000) {
      blob = new Blob(sketch, 0, 0, 64);
      blobs = [];
    }

    while(blobs.length < 200) {
      var x = sketch.random(-sketch.width, sketch.width) * blob.r / 32;
      var y = sketch.random(-sketch.height, sketch.height) * blob.r / 32;
      blobs.push(new Blob(sketch, x, y, sketch.random(10, blob.r)));
    }

    blob.show();
    shader.set("width", sketch.width);
    shader.set("height", sketch.height);
    shader.set("blobx", blob.pos.x);
    shader.set("bloby", blob.pos.y);
    shader.set("blobr", 1 / zoom * 64);

    sketch.filter(shader);

  }

};

var myp5 = new p5(s);
