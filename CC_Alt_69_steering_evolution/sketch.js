// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Steering Evolution
// Another version:
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning/tree/master/week2-evolution/01_evolve_steering

// Part 1: [TBA]
// Part 2: [TBA]
// Part 3: [TBA]
// Part 4: [TBA]
// Part 5: [TBA]

// instance mode by Naoto Hieda

var vehicles = [];
var food = [];
var poison = [];
var meaningless = [];

var debug;


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    for (var i = 0; i < 50; i++) {
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      vehicles[i] = new Vehicle(sketch, x, y);
    }

    for (var i = 0; i < 40; i++) {
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      food.push(sketch.createVector(x, y));
    }

    for (var i = 0; i < 20; i++) {
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      poison.push(sketch.createVector(x, y));
    }

    // debug = sketch.createCheckbox();
    debug = {
      checked: function () {
        return sketch.key == 'd';
      }
    }

  }

  sketch.mouseDragged = function () {
    vehicles.push(new Vehicle(sketch, sketch.mouseX, sketch.mouseY));
  }

  sketch.draw = function () {
    sketch.background(0);

    if (vehicles.length < 20) {
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      vehicles.push(new Vehicle(sketch, x, y));
    }

    for (let i = 0; i < 3; i++) {
      let x = sketch.floor(sketch.random(1, 4)) * sketch.width / 4;
      x += sketch.randomGaussian() * 0.1;
      let y = sketch.random(sketch.height);
      if (sketch.millis() * 0.001 % 8 < 4) {
        y = [x, x = y][0];
      }
      food.push(sketch.createVector(x, y));
      if (food.length > 100) {
        food.shift();
      }
    }

    for (let i = 0; i < 3; i++) {
      let x = (sketch.floor(sketch.random(4)) + 0.5) * sketch.width / 4;
      x += sketch.randomGaussian() * 0.1;
      let y = sketch.random(sketch.height);
      if (sketch.millis() * 0.001 % 8 < 4) {
        y = [x, x = y][0];
      }
      poison.push(sketch.createVector(x, y));
      if (poison.length > 100) {
        poison.shift();
      }
    }
    // {
    //   let x = sketch.random(sketch.width);
    //   let y = sketch.random(sketch.height);
    //   meaningless.push(sketch.createVector(x, y));
    //   if (meaningless.length > 100) meaningless.shift();
    // }

    let rad = 40;
    for (var i = 0; i < food.length; i++) {
      sketch.fill(255, 255, 0, 50);
      sketch.noStroke();
      sketch.ellipse(food[i].x, food[i].y, rad, rad);
    }

    for (var i = 0; i < poison.length; i++) {
      sketch.fill(255, 0, 0, 50);
      sketch.noStroke();
      sketch.ellipse(poison[i].x, poison[i].y, rad, rad);
    }

    // for (var i = 0; i < meaningless.length; i++) {
    //   sketch.fill(0, 200, 50, 50);
    //   sketch.noStroke();
    //   sketch.ellipse(meaningless[i].x, meaningless[i].y, rad, rad);
    // }

    for (let j = 0; j < 20; j++) {
      for (var i = vehicles.length - 1; i >= 0; i--) {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        vehicles[i].update();
        vehicles[i].display();

        var newVehicle = vehicles[i].clone();
        if (newVehicle != null) {
          vehicles.push(newVehicle);
        }

        if (vehicles[i].dead()) {
          var x = vehicles[i].position.x;
          var y = vehicles[i].position.y;
          // food.push(sketch.createVector(x, y));
          vehicles.splice(i, 1);
        }

      }
    }
  }

};

var myp5 = new p5(s);
