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

var debug;


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(640, 360);
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
      checked: function() {
        return sketch.key == 'd';
      }
    }

  }

  sketch.mouseDragged = function () {
    vehicles.push(new Vehicle(sketch, sketch.mouseX, sketch.mouseY));
  }

  sketch.draw = function () {
    sketch.background(51);

    if (sketch.random(1) < 0.1) {
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      food.push(sketch.createVector(x, y));
    }

    if (sketch.random(1) < 0.01) {
      var x = sketch.random(sketch.width);
      var y = sketch.random(sketch.height);
      poison.push(sketch.createVector(x, y));
    }


    for (var i = 0; i < food.length; i++) {
      sketch.fill(0, 255, 0);
      sketch.noStroke();
      sketch.ellipse(food[i].x, food[i].y, 4, 4);
    }

    for (var i = 0; i < poison.length; i++) {
      sketch.fill(255, 0, 0);
      sketch.noStroke();
      sketch.ellipse(poison[i].x, poison[i].y, 4, 4);
    }

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
        food.push(sketch.createVector(x, y));
        vehicles.splice(i, 1);
      }

    }
  }

};

var myp5 = new p5(s);
