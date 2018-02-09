// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/BAejnwN4Ccw

// instance mode by Naoto Hieda

var cities = [];
var totalCities = 5;

var recordDistance;
var bestEver;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 300);
    for (var i = 0; i < totalCities; i++) {
      var v = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height));
      cities[i] = v;
    }

    var d = sketch.calcDistance(cities);
    recordDistance = d;
    bestEver = cities.slice();

  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.fill(255);
    for (var i = 0; i < cities.length; i++) {
      sketch.ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    sketch.stroke(255);
    sketch.strokeWeight(1);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < cities.length; i++) {
      sketch.vertex(cities[i].x, cities[i].y);
    }
    sketch.endShape();

    sketch.stroke(255, 0, 255);
    sketch.strokeWeight(4);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < cities.length; i++) {
      sketch.vertex(bestEver[i].x, bestEver[i].y);
    }
    sketch.endShape();



    var i = sketch.floor(sketch.random(cities.length));
    var j = sketch.floor(sketch.random(cities.length));
    sketch.swap(cities, i, j);

    var d = sketch.calcDistance(cities);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = cities.slice();
    }
  }

  sketch.swap = function (a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }


  sketch.calcDistance = function (points) {
    var sum = 0;
    for (var i = 0; i < points.length - 1; i++) {
      var d = sketch.dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
      sum += d;
    }
    return sum;
  }

};

var myp5 = new p5(s);
