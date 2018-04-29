// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Neuro-Evolution Flappy Bird

// Part 1: https://youtu.be/c6y21FkaUqw
// Part 2: https://youtu.be/tRA6tqgJBc
// Part 3: https://youtu.be/3lvj9jvERvs
// Part 4: https://youtu.be/HrvNpbnjEG8
// Part 5: https://youtu.be/U9wiMM3BqLU

// instance mode by Naoto Hieda

const TOTAL = 500;
var birds = [];
var savedBirds = [];
var pipes = [];
var counter = 0;
var slider;

var s = function (p) {

  p.keyPressed = function () {
    if (p.key === 'S') {
      let bird = birds[0];
      p.saveJSON(bird.brain, 'bird.json');
    }
  }

  p.setup = function () {
    p.createCanvas(640, 480);
    slider = p.createSlider(1, 10, 1);
    for (let i = 0; i < TOTAL; i++) {
      birds[i] = new Bird();
    }
  }

  p.draw = function () {
    for (let n = 0; n < slider.value(); n++) {
      if (counter % 75 == 0) {
        pipes.push(new Pipe());
      }
      counter++;

      for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();

        for (let j = birds.length - 1; j >= 0; j--) {
          if (pipes[i].hits(birds[j])) {
            savedBirds.push(birds.splice(j, 1)[0]);
          }
        }

        if (pipes[i].offscreen()) {
          pipes.splice(i, 1);
        }
      }

      for (let i = birds.length - 1; i >= 0; i--) {
        if (birds[i].offScreen()) {
          savedBirds.push(birds.splice(i, 1)[0]);
        }
      }

      for (let bird of birds) {
        bird.think(pipes);
        bird.update();
      }

      if (birds.length === 0) {
        counter = 0;
        nextGeneration();
        pipes = [];
      }
    }

    // All the drawing stuff
    p.background(0);

    for (let bird of birds) {
      bird.show();
    }

    for (let pipe of pipes) {
      pipe.show();
    }
  }

  // function keyPressed() {
  //   if (key == ' ') {
  //     bird.up();
  //     //console.log("SPACE");
  //   }
  // }

};

var myp5 = new p5(s);