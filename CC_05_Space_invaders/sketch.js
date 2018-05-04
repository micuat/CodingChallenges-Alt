// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

// instance mode by Naoto Hieda

var s = function (p) {

  var ship;
  var flowers = [];
  var drops = [];

  p.setup = function () {
    p.createCanvas(600, 400);
    ship = new Ship();
    // drop = new Drop(width/2, height/2);
    for (var i = 0; i < 6; i++) {
      flowers[i] = new Flower(i * 80 + 80, 60);
    }
  }

  p.draw = function () {
    p.background(51);
    ship.show();
    ship.move();

    for (var i = 0; i < drops.length; i++) {
      drops[i].show();
      drops[i].move();
      for (var j = 0; j < flowers.length; j++) {
        if (drops[i].hits(flowers[j])) {
          flowers[j].grow();
          drops[i].evaporate();
        }
      }
    }

    var edge = false;

    for (var i = 0; i < flowers.length; i++) {
      flowers[i].show();
      flowers[i].move();
      if (flowers[i].x > p.width || flowers[i].x < 0) {
        edge = true;
      }
    }

    if (edge) {
      for (var i = 0; i < flowers.length; i++) {
        flowers[i].shiftDown();
      }
    }

    for (var i = drops.length - 1; i >= 0; i--) {
      if (drops[i].toDelete) {
        drops.splice(i, 1);
      }
    }


  }

  p.keyReleased = function () {
    if (p.key != ' ') {
      ship.setDir(0);
    }
  }


  p.keyPressed = function () {
    if (p.key == ' ') {
      var drop = new Drop(ship.x, p.height);
      drops.push(drop);
    }

    if (p.keyCode === p.RIGHT_ARROW) {
      ship.setDir(1);
    } else if (p.keyCode === p.LEFT_ARROW) {
      ship.setDir(-1);
    }
  }

};

var p005 = new p5(s);