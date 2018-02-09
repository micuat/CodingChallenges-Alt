// instance mode by Naoto Hieda

var cities = [];
var citiesMoved = [];
var totalCities = 16;

var popSize = 500;
var population = [];
var fitness = [];

var recordDistance = Infinity;
var bestEver;
var currentBest;

var statusP;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.init();
    citiesMoved = cities.slice();
  }

  sketch.draw = function () {
    sketch.background(0);

    // GA
    calculateFitness(sketch);
    normalizeFitness(sketch);
    nextGeneration(sketch);

    sketch.translate(0, sketch.height/4);
    sketch.stroke(255);
    sketch.strokeWeight(2);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < currentBest.length; i++) {
      var n = currentBest[i];
      sketch.vertex(citiesMoved[n].x, citiesMoved[n].y);
    }
    sketch.endShape();
    sketch.fill(255);
    for (var i = 0; i < currentBest.length; i++) {
      var n = currentBest[i];
      sketch.ellipse(citiesMoved[n].x, citiesMoved[n].y, 8, 8);
    }

    for (var i = 0; i < currentBest.length; i++) {
      let n = currentBest[i];
      let c = citiesMoved[n];
      if(n == 0) continue;
      if(n == totalCities - 1) continue;
      c.x += sketch.random(-1, 1) * 2;
      c.y += sketch.random(-1, 1) * 2;
      c.x = sketch.lerp(c.x, cities[n].x, 0.05);
      c.y = sketch.lerp(c.y, cities[n].y, 0.05);
    }

    if(sketch.frameCount % 120 == 0) {
      sketch.init();
    }
  }

  sketch.init = function () {
    var order = [];
    for (var i = 0; i < totalCities; i++) {
      var v = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height/2));
      if(i == 0) {
        v = sketch.createVector(0, sketch.height * 0.75);
      }
      if(i == totalCities - 1) {
        v = sketch.createVector(sketch.width, sketch.height * -0.25);
      }
      cities[i] = v;
      order[i] = i;
    }

    for (var i = 0; i < popSize; i++) {
      // population[i] = sketch.shuffle(order);
      population[i] = [];
      let remainingIndices = [];
      for (let j in order) {
        remainingIndices.push(j);
      }
      for (let j in order) {
        let index = sketch.floor(sketch.random(remainingIndices.length));
        population[i].push(order[remainingIndices[index]]);
        remainingIndices.splice(index, 1);
      }
    }
  }

  // function shuffle(a, num) {
  //   for (var i = 0; i < num; i++) {
  //     var indexA = floor(random(a.length));
  //     var indexB = floor(random(a.length));
  //     swap(a, indexA, indexB);
  //   }
  // }


  sketch.swap = function (a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }


  sketch.calcDistance = function (points, order) {
    var sum = 0;
    for (var i = 0; i < order.length - 1; i++) {
      var cityAIndex = order[i];
      var cityA = points[cityAIndex];
      var cityBIndex = order[i + 1];
      var cityB = points[cityBIndex];
      var d = sketch.dist(cityA.x, cityA.y, cityB.x, cityB.y);
      sum += d;
    }
    return sum;
  }

};

var myp5 = new p5(s);
