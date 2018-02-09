// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/goUlyp4rwiU

// instance mode by Naoto Hieda

var vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 300);
  }

  sketch.draw = function () {
    console.log(vals);

    // STEP 1 of the algorithm
    // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestI = -1;
    for (var i = 0; i < vals.length - 1; i++) {
      if (vals[i] < vals[i + 1]) {
        largestI = i;
      }
    }
    if (largestI == -1) {
      sketch.noLoop();
      console.log('finished');
    }

    // STEP 2
    var largestJ = -1;
    for (var j = 0; j < vals.length; j++) {
      if (vals[largestI] < vals[j]) {
        largestJ = j;
      }
    }

    // STEP 3
    sketch.swap(vals, largestI, largestJ);

    // STEP 4: reverse from largestI + 1 to the end
    var endArray = vals.splice(largestI + 1, vals.length);
    endArray.reverse();
    vals = vals.concat(endArray);

    sketch.background(0);
    sketch.textSize(64);
    var s = '';
    for (var i = 0; i < vals.length; i++) {
      s += vals[i];
    }
    sketch.fill(255);
    sketch.text(s, 20, sketch.height / 2);


  }

  sketch.swap = function (a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

};

var myp5 = new p5(s);
