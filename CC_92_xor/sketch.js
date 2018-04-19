// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// XOR
// https://youtu.be/188B6k_F9jU

// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS

// instance mode by Naoto Hieda

var s = function (p) {
  let nn;
  let lr_slider;

  let training_data = [{
    inputs: [0, 0],
    outputs: [0]
  },
  {
    inputs: [0, 1],
    outputs: [1]
  },
  {
    inputs: [1, 0],
    outputs: [1]
  },
  {
    inputs: [1, 1],
    outputs: [0]
  }
  ];

  p.setup = function () {
    p.createCanvas(400, 400);
    // let synaptic = require('synaptic');
    nn = new synaptic.Architect.Perceptron(2, 4, 1);
    // nn = new NeuralNetwork(2, 4, 1);
    // lr_slider = p.createSlider(0.01, 0.5, 0.1, 0.01);

  }

  p.draw = function () {
    p.background(0);

    for (let i = 0; i < 100; i++) {
      let data = p.random(training_data);
      // nn.train(data.inputs, data.outputs);
      nn.activate(data.inputs);
      nn.propagate(p.map(p.mouseX, 0, p.width, 0.01, 0.5), data.outputs)
    }

    // nn.setLearningRate(p.map(p.mouseX, 0, p.width, 0.01, 0.5));

    let resolution = 10;
    let cols = p.width / resolution;
    let rows = p.height / resolution;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x1 = i / cols;
        let x2 = j / rows;
        let inputs = [x1, x2];
        // let y = nn.predict(inputs);
        let y = nn.activate(inputs);
        p.noStroke();
        p.fill(y * 255);
        p.rect(i * resolution, j * resolution, resolution, resolution);
      }
    }



  }

};

var myp5 = new p5(s);
