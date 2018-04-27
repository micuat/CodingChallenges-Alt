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

var which = "black";

var wButton;
var bButton;

var s = function (p) {

  function pickColor() {
    r = p.random(255);
    g = p.random(255);
    b = p.random(255);
    p.redraw();
  }

  p.setup = function () {
    p.createCanvas(600, 300);
    p.noLoop();
    brain = new synaptic.Architect.Perceptron(3, 3, 2);
    // brain = new NeuralNetwork(3, 3, 2);

    for (let i = 0; i < 10000; i++) {
      let r = p.random(255);
      let g = p.random(255);
      let b = p.random(255);
      let targets = trainColor(r, g, b);
      let inputs = [r / 255, g / 255, b / 255];
      brain.activate(inputs);
      brain.propagate(0.4, targets);
      // brain.train(inputs, targets);
    }

    pickColor();

  }

  p.mousePressed = function () {
    // let targets;
    // if (mouseX > width / 2) {
    //   targets = [0, 1];
    // } else {
    //   targets = [1, 0];
    // }
    // let inputs = [r / 255, g / 255, b / 255];
    //
    // brain.train(inputs, targets);


    pickColor();
  }


  function colorPredictor(r, g, b) {
    console.log(Math.floor(r + g + b));
    let inputs = [r / 255, g / 255, b / 255];
    let outputs = brain.activate(inputs);
    //console.log(outputs);

    if (outputs[0] > outputs[1]) {
      return "black";
    } else {
      return "white";
    }

    // if (r + g + b > 300) {
    //   return "black";
    // } else {
    //   return "white";
    // }
  }

  function trainColor(r, g, b) {
    if (r + g + b > (255 * 3) / 2) {
      return [1, 0];
    } else {
      return [0, 1];
    }
  }


  p.draw = function () {
    p.background(r, g, b);
    p.strokeWeight(4);
    p.stroke(0);
    p.line(p.width / 2, 0, p.width / 2, p.height);

    p.textSize(64);
    p.noStroke();
    p.fill(0);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("black", 150, 100);
    p.fill(255);
    p.text("white", 450, 100);

    let which = colorPredictor(r, g, b);
    if (which === "black") {
      p.fill(0);
      p.ellipse(150, 200, 60);
    } else {
      p.fill(255);
      p.ellipse(450, 200, 60);
    }


  }

};

var myp5 = new p5(s);