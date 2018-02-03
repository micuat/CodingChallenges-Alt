// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/bGz7mv2vD6g

// instance mode by Naoto Hieda

var first = true;

var population;
// Each rocket is alive till 400 frames
var lifespan = 400;
// Made to display count on screen
// var lifeP;
// Keeps track of frames

if (first)
  var count = 0;
// Where rockets are trying to go
var target;
// Max force applied to rocket
var maxforce = 0.4;

// Dimensions of barrier
var rx = 200;
var ry = 300;
var rw = 400;
var rh = 10;

var matrix = [];
var alphas = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    if (first)
      population = new Population(sketch);
    // lifeP = sketch.createP();
    target = sketch.createVector(sketch.width / 2, 50);
    for (let i in population.rockets) {
      let rocket = population.rockets[i];
      matrix[i] = [];
      alphas[i] = 100;
      for (let j in rocket.dna.genes) {
        matrix[i][j] = rocket.dna.genes[j].x;
      }
    }

    sketch.blendMode(sketch.BLEND);
    sketch.hint(sketch.DISABLE_DEPTH_TEST);
  }

  sketch.draw = function () {
    sketch.background(0);

    for (let i = 0; i < 20; i++) {
      population.run();

      count++;
      if (count == lifespan) {
        population.evaluate();
        population.selection();
        // Population = new Population();
        count = 0;
      }
    }
    // Renders barrier for rockets
    // sketch.background(0);
    sketch.fill(255);
    sketch.noStroke();
    // sketch.rect(rx, ry, rw, rh);
    // Renders target
    // sketch.ellipse(target.x, target.y, 16, 16);

    sketch.noStroke();
    let h = sketch.width / population.rockets.length;
    for (let i in population.rockets) {
      let rocket = population.rockets[i];
      for (let j in rocket.dna.genes) {
        let p = 0.7;
        if(count > i%4 * 100)
          matrix[i][j] = p * matrix[i][j] + (1 - p) * rocket.dna.genes[j].x;
        let a = 100;
        if(rocket.completed) alphas[i] = a = 200;
        p = 0.9995;
        alphas[i] = p * alphas[i] + (1-p) * a;
        sketch.fill((matrix[i][j] + maxforce) * 255, alphas[i]);
        sketch.rect(j * 2, i * h, 2, h);
      }
    }
    sketch.push();
    sketch.translate(0, 0, -200);
    // sketch.translate(sketch.width/2, sketch.height/2);
    sketch.translate(sketch.width/2, 0);
    sketch.rotateY(sketch.millis() * 0.0001);
    // sketch.translate(-sketch.width/2, -sketch.height/2);
    population.show();
    sketch.pop();
  }

};

var myp5 = new p5(s);
