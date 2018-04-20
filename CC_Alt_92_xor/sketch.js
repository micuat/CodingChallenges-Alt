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

  let training_data;

  p.setup = function () {
    p.createCanvas(800, 800);

    reset();
  }

  function reset() {
    nn = new synaptic.Architect.Perceptron(2, 4, 3);
    training_data = [{
      inputs: [p.random(0, 0.5), p.random(0, 0.5)],
      outputs: [p.random(1), p.random(1), p.random(1)]
    },
    {
      inputs: [p.random(0, 0.5), p.random(0.5, 1)],
      outputs: [p.random(1), p.random(1), p.random(1)]
    },
    {
      inputs: [p.random(0.5, 1), p.random(0, 0.5)],
      outputs: [p.random(1), p.random(1), p.random(1)]
    },
    {
      inputs: [p.random(0.5, 1), p.random(0.5, 1)],
      outputs: [p.random(1), p.random(1), p.random(1)]
    }
    ];
  }

  p.draw = function () {
    p.background(0);

    if(p.frameCount % 30 == 0) {
      reset();
    }

    for (let i = 0; i < 100; i++) {
      let data = p.random(training_data);
      // nn.train(data.inputs, data.outputs);
      nn.activate(data.inputs);
      nn.propagate(0.4, data.outputs)
    }

    // nn.setLearningRate(p.map(p.mouseX, 0, p.width, 0.01, 0.5));

    let resolution = 40;
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
        p.fill(y[0] * 255, y[1] * 255, y[2] * 255);
        p.rect(i * resolution, j * resolution, resolution, resolution);
      }
    }



  }

};

var myp5 = new p5(s);
