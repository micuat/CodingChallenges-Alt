// instance mode by Naoto Hieda

var cities = [];
var totalCities = 12;

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
    var order = [];
    for (var i = 0; i < totalCities; i++) {
      var v = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height / 2));
      cities[i] = v;
      order[i] = i;
    }

    for (var i = 0; i < popSize; i++) {
      population[i] = sketch.shuffle(order);
    }
    statusP = sketch.createP('').style('font-size', '32pt');
  }

  sketch.draw = function () {
    sketch.background(0);

    // GA
    calculateFitness(sketch);
    normalizeFitness(sketch);
    nextGeneration(sketch);

    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < bestEver.length; i++) {
      var n = bestEver[i];
      sketch.vertex(cities[n].x, cities[n].y);
      sketch.ellipse(cities[n].x, cities[n].y, 16, 16);
    }
    sketch.endShape();

    sketch.translate(0, sketch.height / 2);
    sketch.stroke(255);
    sketch.strokeWeight(4);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < currentBest.length; i++) {
      var n = currentBest[i];
      sketch.vertex(cities[n].x, cities[n].y);
      sketch.ellipse(cities[n].x, cities[n].y, 16, 16);
    }
    sketch.endShape();





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
