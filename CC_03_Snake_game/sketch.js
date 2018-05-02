// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

// instance mode by Naoto Hieda

var sk = function (p) {

  let s;
  let scl = 20;

  let food;

  p.setup = function () {
    p.createCanvas(600, 600);
    s = new Snake(scl);
    p.frameRate(10);
    p.pickLocation();

  }

  p.pickLocation = function () {
    var cols = p.floor(p.width / scl);
    var rows = p.floor(p.height / scl);
    food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
    food.mult(scl);
  }

  p.mousePressed = function () {
    s.total++;
  }

  p.draw = function () {
    p.background(51);

    if (s.eat(food)) {
      p.pickLocation();
    }
    s.death();
    s.update();
    s.show();


    p.fill(255, 0, 100);
    p.rect(food.x, food.y, scl, scl);
  }

  p.keyPressed = function () {
    if (p.keyCode === p.UP_ARROW) {
      s.dir(0, -1);
    } else if (p.keyCode === p.DOWN_ARROW) {
      s.dir(0, 1);
    } else if (p.keyCode === p.RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (p.keyCode === p.LEFT_ARROW) {
      s.dir(-1, 0);
    }
  }

};

var p003 = new p5(sk);