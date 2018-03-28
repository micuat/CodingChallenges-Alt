// port of Daniel Shiffman's Pong coding challenge
// by madacoo

// instance mode by Naoto Hieda

var leftscore = 0;
var rightscore = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(600, 400);
    if(sketch.isLiveJs == false)
      ding = sketch.loadSound("data/ding.mp3");
    puck = new Puck(sketch);
    left = new Paddle(sketch, true);
    right = new Paddle(sketch, false);
  }

  sketch.draw = function () {
    sketch.background(0);

    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);

    left.show();
    right.show();
    left.update();
    right.update();

    puck.update();
    puck.edges();
    puck.show();

    sketch.fill(255);
    sketch.textSize(32);
    sketch.text(leftscore, 32, 40);
    sketch.text(rightscore, sketch.width - 64, 40);
  }


  sketch.keyReleased = function () {
    left.move(0);
    right.move(0);
  }

  sketch.keyPressed = function () {
    console.log(sketch.key);
    if (sketch.key == 'a') {
      left.move(-10);
    } else if (sketch.key == 'z') {
      left.move(10);
    }

    if (sketch.key == 'j') {
      right.move(-10);
    } else if (sketch.key == 'm') {
      right.move(10);
    }
  }

};

var myp5 = new p5(s);
