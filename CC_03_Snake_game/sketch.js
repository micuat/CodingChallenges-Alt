// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

// instance mode by Naoto Hieda

var sk = function (sketch) {

  var s;
  var scl = 20;

  var food;

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    s = new Snake(sketch, scl);
    sketch.frameRate(10);
    sketch.pickLocation();

  }

  sketch.pickLocation = function () {
    var cols = sketch.floor(sketch.width / scl);
    var rows = sketch.floor(sketch.height / scl);
    food = sketch.createVector(sketch.floor(sketch.random(cols)), sketch.floor(sketch.random(rows)));
    food.mult(scl);
  }

  sketch.mousePressed = function () {
    s.total++;
  }

  sketch.draw = function () {
    sketch.background(51);

    if (s.eat(food)) {
      sketch.pickLocation();
    }
    s.death();
    s.update();
    s.show();


    sketch.fill(255, 0, 100);
    sketch.rect(food.x, food.y, scl, scl);
  }

  sketch.keyPressed = function () {
    if (sketch.keyCode === sketch.UP_ARROW) {
      s.dir(0, -1);
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
      s.dir(0, 1);
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (sketch.keyCode === sketch.LEFT_ARROW) {
      s.dir(-1, 0);
    }
  }

};

var myp5 = new p5(sk);