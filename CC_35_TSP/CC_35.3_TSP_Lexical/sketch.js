// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/9Xy-LMAfglE

// instance mode by Naoto Hieda

var cities = [];
var totalCities = 10;

var order = [];

var totalPermutations;
var count = 0;


var recordDistance;
var bestEver;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 600);
    for (var i = 0; i < totalCities; i++) {
      var v = sketch.createVector(sketch.random(sketch.width), sketch.random(sketch.height / 2));
      cities[i] = v;
      order[i] = i;
    }

    var d = sketch.calcDistance(cities, order);
    recordDistance = d;
    bestEver = order.slice();

    totalPermutations = sketch.factorial(totalCities);
    console.log(totalPermutations);

  }

  sketch.draw = function () {
    sketch.background(0);
    //frameRate(5);
    sketch.fill(255);
    for (var i = 0; i < cities.length; i++) {
      sketch.ellipse(cities[i].x, cities[i].y, 8, 8);
    }

    sketch.stroke(255, 0, 255);
    sketch.strokeWeight(4);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < order.length; i++) {
      var n = bestEver[i];
      sketch.vertex(cities[n].x, cities[n].y);
    }
    sketch.endShape();


    sketch.translate(0, sketch.height / 2);
    sketch.stroke(255);
    sketch.strokeWeight(1);
    sketch.noFill();
    sketch.beginShape();
    for (var i = 0; i < order.length; i++) {
      var n = order[i];
      sketch.vertex(cities[n].x, cities[n].y);
    }
    sketch.endShape();



    var d = sketch.calcDistance(cities, order);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = order.slice();
    }

    sketch.textSize(32);
    // var s = '';
    // for (var i = 0; i < order.length; i++) {
    //   s += order[i];
    // }
    sketch.fill(255);
    var percent = 100 * (count / totalPermutations);
    sketch.text(sketch.nf(percent, 0, 2) + "% completed", 20, sketch.height / 2 - 50);

    sketch.nextOrder();


  }


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

  // This is my lexical order algorithm

  sketch.nextOrder = function () {
    count++;

    // STEP 1 of the algorithm
    // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestI = -1;
    for (var i = 0; i < order.length - 1; i++) {
      if (order[i] < order[i + 1]) {
        largestI = i;
      }
    }
    if (largestI == -1) {
      sketch.noLoop();
      console.log('finished');
    }

    // STEP 2
    var largestJ = -1;
    for (var j = 0; j < order.length; j++) {
      if (order[largestI] < order[j]) {
        largestJ = j;
      }
    }

    // STEP 3
    sketch.swap(order, largestI, largestJ);

    // STEP 4: reverse from largestI + 1 to the end
    var endArray = order.splice(largestI + 1, order.length);
    endArray.reverse();
    order = order.concat(endArray);
  }

  sketch.factorial = function (n) {
    if (n == 1) {
      return 1;
    } else {
      return n * sketch.factorial(n - 1);
    }
  }

};

var myp5 = new p5(s);
