// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

// instance mode by Naoto Hieda

var bird;
var pipes = [];
var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 600);
    bird = new Bird(sketch);
    pipes.push(new Pipe(sketch));
  }

  sketch.draw = function () {
    sketch.background(0);

    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log("HIT");
      }


      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }


    }

    bird.update();
    bird.show();

    if (sketch.frameCount % 100 == 0) {
      pipes.push(new Pipe(sketch));
    }



  }

  sketch.keyPressed = function () {
    if (sketch.key == ' ') {
      bird.up();
      //console.log("SPACE");
    }
  }

};

var myp5 = new p5(s);
