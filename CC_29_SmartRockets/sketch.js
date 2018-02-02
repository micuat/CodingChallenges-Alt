// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// instance mode by Naoto Hieda

var population;
// Each rocket is alive till 400 frames
var lifespan = 400;
// Made to display count on screen
// var lifeP;
// Keeps track of frames
var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.2;

// Dimensions of barrier
var rx = 100;
var ry = 150;
var rw = 200;
var rh = 10;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 300);
    population = new Population(sketch);
    // lifeP = sketch.createP();
    target = sketch.createVector(sketch.width / 2, 50);

  }

  sketch.draw = function () {
    sketch.background(0);
    population.run();
    // Displays count to window
    // lifeP.html(count);

    count++;
    if (count == lifespan) {
      population.evaluate();
      population.selection();
      // Population = new Population();
      count = 0;
    }
    // Renders barrier for rockets
    sketch.fill(255);
    sketch.rect(rx, ry, rw, rh);
    // Renders target
    sketch.ellipse(target.x, target.y, 16, 16);
  }

};

var myp5 = new p5(s);
