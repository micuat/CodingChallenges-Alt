// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

// instance mode by Naoto Hieda

var s = function (sketch) {

  var ship;
  var flowers = [];
  var drops = [];

  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    ship = new Ship(sketch);
    // drop = new Drop(width/2, height/2);
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 6; j++) {
        var x = j * 80 + 80;
        var y = i * 60 + 60;
        if(i == 0) x += 40;
        flowers.push(new Flower(sketch, x, y, flowers.length));
      }
    }
  }

  sketch.draw = function () {
    sketch.background(0);

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
      if (flowers[i].x > sketch.width - flowers[i].r || flowers[i].x < flowers[i].r) {
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

    ship.show();
    ship.move();

  }

  sketch.keyReleased = function () {
    if (sketch.key != ' ') {
      ship.setDir(0);
    }
  }


  sketch.keyPressed = function () {
    if (sketch.key == ' ') {
      var drop = new Drop(sketch, ship.x, sketch.height);
      drops.push(drop);
    }

    if (sketch.keyCode === sketch.RIGHT_ARROW) {
      ship.setDir(1);
    } else if (sketch.keyCode === sketch.LEFT_ARROW) {
      ship.setDir(-1);
    }
  }

};

var myp5 = new p5(s);