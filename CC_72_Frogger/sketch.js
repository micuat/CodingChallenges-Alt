// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Frogger
// Part 1: https://youtu.be/giXV6xErw0Y
// Part 2: https://youtu.be/06-ZvYmSeus
// Part 3: https://youtu.be/hk326ZHlENQ
// Part 4: https://youtu.be/c6WdJltqEtM

// instance mode by Naoto Hieda

var frog;
var lanes;

var SAFETY = 0;
var CAR = 1;
var LOG = 2;

var grid = 50;

var s = function (sketch) {

  sketch.resetGame = function () {
    frog = new Frog(sketch, sketch.width / 2 - grid / 2, sketch.height - grid, grid);
    frog.attach(null);
  }

  sketch.setup = function () {
    sketch.createCanvas(500, 550);
    //frog = new Frog(width/2-grid/2, height-grid, grid);
    sketch.resetGame();
    let totalLanes = parseInt(sketch.height / grid);
    lanes = new Array(totalLanes);
    lanes[0] = new Lane(sketch, 0, sketch.color(100));
    lanes[1] = new Lane(sketch, 1, LOG, 3, 1, 150, 3);
    lanes[2] = new Lane(sketch, 2, LOG, 2, 3, 350, -2.5);
    lanes[3] = new Lane(sketch, 3, LOG, 4, 1, 200, 1);
    lanes[4] = new Lane(sketch, 4, LOG, 3, 2, 250, -1.7);
    lanes[5] = new Lane(sketch, 5, sketch.color(100));
    lanes[6] = new Lane(sketch, 6, CAR, 3, 1, 150, 2.4);
    lanes[7] = new Lane(sketch, 7, CAR, 2, 2, 150, -3.6);
    lanes[8] = new Lane(sketch, 8, CAR, 1, 3, 150, 2.3);
    lanes[9] = new Lane(sketch, 9, CAR, 4, 1, 150, -1);
    lanes[10] = new Lane(sketch, 10, sketch.color(100));
  }

  sketch.draw = function () {
    sketch.background(0);
    for (let i in lanes) {
      let lane = lanes[i];
      lane.run();
    }
    let laneIndex = parseInt(frog.y / grid);
    lanes[laneIndex].check(frog);
    frog.update();
    frog.show();
  }

  sketch.keyPressed = function () {

    if (sketch.keyCode == sketch.UP_ARROW) {
      frog.move(0, -1);
    } else if (sketch.keyCode == sketch.DOWN_ARROW) {
      frog.move(0, 1);
    } else if (sketch.keyCode == sketch.RIGHT_ARROW) {
      frog.move(1, 0);
    } else if (sketch.keyCode == sketch.LEFT_ARROW) {
      frog.move(-1, 0);
    }
  }

};

var myp5 = new p5(s);
