// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

// instance mode by Naoto Hieda

var bird;
var pipes = [];
var count = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
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

    let freq = Math.min(Math.ceil(count/200), 6);
    freq = Math.pow(2, 10-freq);
    if (sketch.frameCount % freq == 0) {
      pipes.push(new Pipe(sketch));
    }
    count++;

    let index = 0;
    while(bird.x > pipes[index].x) index++;
    if(bird.y >(pipes[index].top + pipes[index].bottom) * 0.5+50)
      bird.up();

  }

  sketch.keyPressed = function () {
    if (sketch.key == ' ') {
      bird.up();
      //console.log("SPACE");
    }
  }

};

var myp5 = new p5(s);
