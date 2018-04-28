// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Color Predictor
// https://youtu.be/KtPpoMThKUs

// Inspired by Jabril's SEFD Science
// https://youtu.be/KO7W0Qq8yUE
// https://youtu.be/iN3WAko2rL8

// instance mode by Naoto Hieda

var r, g, b;
var brain;

var n = 20;

var test = "r + g + b > (255 * 3) * ";
var th = 0.3;

var s = function (p) {

  function pickColor() {
    r = p.random(255);
    g = p.random(255);
    b = p.random(255);
  }

  p.setup = function () {
    p.createCanvas(800, 800);
    brain = new synaptic.Architect.Perceptron(3, 3, 2);
  }

  function colorPredictor(r, g, b) {
    let inputs = [r / 255, g / 255, b / 255];
    let outputs = brain.activate(inputs);

    return outputs[0];
  }

  function trainColor(r, g, b) {
    if (eval(test + th)) {
      return [1, 0];
    } else {
      return [0, 1];
    }
  }

  let found = false;
  p.draw = function () {
    for (let i = 0; i < 10; i++) {
      let r = p.random(255);
      let g = p.random(255);
      let b = 0;//p.random(255);
      let targets = trainColor(r, g, b);
      let inputs = [r / 255, g / 255, b / 255];
      brain.activate(inputs);
      brain.propagate(0.4, targets);
    }

    p.background(255);
    p.noStroke();
    p.rectMode(p.CENTER);
    let s = Math.cos(p.frameCount / 60 * p.PI);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let r = i / n * 255;
        let g = j / n * 255;
        let res = colorPredictor(r, g, 0);
        p.push();
        p.translate((i+0.5) / n * p.width, (j+0.5) / n * p.height);

        p.fill(r, g, 0);
        p.rect((0) / n * p.width, 0, p.width / n, p.height / n);

        p.fill(res * 255);
        if(res > 0.5) {
          p.ellipse(10, 0, 10);
        }
        else {
          p.ellipse(-10, 0, 10);
        }
        p.pop();
      }
    }
  }

};

var myp5 = new p5(s);