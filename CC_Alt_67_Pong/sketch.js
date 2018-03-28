// port of Daniel Shiffman's Pong coding challenge
// by madacoo

// instance mode by Naoto Hieda

var leftscore = 0;
var rightscore = 0;
var pucks = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    // for (let i = 0; i < 16; i++) {
    //   pucks.push(new Puck(sketch));
    // }
    pucks.push(new Puck(sketch));
    left = new Paddle(sketch, true);
    right = new Paddle(sketch, false);
    sketch.background(0);
  }

  sketch.draw = function () {
    sketch.noStroke();
    sketch.fill(0);
    let phase = sketch.millis() * 0.1 % (sketch.width);
    let x = phase % (sketch.width / 2);
    if (phase < sketch.width / 2) {
      sketch.rect(x, 0, 10, sketch.height * 2);
      sketch.rect(sketch.width - x, 0, 10, sketch.height * 2);
    }
    else {
      sketch.push();
      // sketch.stroke(0, 100);
      // sketch.strokeWeight(2);
      // sketch.noFill();
      // sketch.rectMode(sketch.CENTER);
      // sketch.rect(sketch.width/2, sketch.height/2, x, x);
      sketch.ellipse(this.width / 2, this.height / 2, (x) * 2 * Math.sqrt(2))
      sketch.pop();
    }
    if (pucks.length < 1024 && sketch.frameCount % 2 == 0) {
      pucks.push(new Puck(sketch));
    }
    // sketch.background(0);

    for (let i in pucks) {
      let puck = pucks[i];
      puck.checkPaddleRight(right);
      puck.checkPaddleLeft(left);
    }
    left.show();
    right.show();
    left.update();
    right.update();

    for (let i in pucks) {
      let puck = pucks[i];
      puck.update();
      puck.edges();
      puck.show();
    }

    sketch.fill(255);
    sketch.textSize(32);
    sketch.textAlign(sketch.LEFT);
    sketch.text(sketch.nf(leftscore, 1), 32, 40);
    sketch.textAlign(sketch.RIGHT);
    sketch.text(sketch.nf(rightscore, 1), sketch.width - 40, 40);
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
