// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

// instance mode by Naoto Hieda

var ship;
var asteroids = [];
var lasers = [];


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    ship = new Ship(sketch);
    for (var i = 0; i < 5; i++) {
      asteroids.push(new Asteroid(sketch));
    }
  }

  sketch.draw = function () {
    sketch.background(0);

    for (var i = 0; i < asteroids.length; i++) {
      if (ship.hits(asteroids[i])) {
        console.log('ooops!');
      }
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
      } else {
        for (var j = asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 10) {
              var newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
            }
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            break;
          }
        }
      }
    }

    console.log(lasers.length);

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    ship.setRotation(0.05);
    if(sketch.frameCount % 4 == 0)
    lasers.push(new Laser(sketch, ship.pos, ship.heading));

    if(sketch.frameCount % 60 == 0)
    asteroids.push(new Asteroid(sketch));

  }

  sketch.keyReleased = function () {
    ship.setRotation(0);
    ship.boosting(false);
  }

  sketch.keyPressed = function () {
    if (sketch.key == ' ') {
      lasers.push(new Laser(sketch, ship.pos, ship.heading));
    } else if (sketch.keyCode == sketch.RIGHT_ARROW) {
      ship.setRotation(0.1);
    } else if (sketch.keyCode == sketch.LEFT_ARROW) {
      ship.setRotation(-0.1);
    } else if (sketch.keyCode == sketch.UP_ARROW) {
      ship.boosting(true);
    }
  }

};

var myp5 = new p5(s);
