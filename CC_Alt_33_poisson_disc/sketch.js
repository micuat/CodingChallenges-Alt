// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/flQgnCUxHlw

// instance mode by Naoto Hieda

var r = 4;
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    sketch.background(0);
    sketch.strokeWeight(4);
    sketch.colorMode(sketch.RGB);

    // STEP 0
    cols = sketch.floor(sketch.width / w);
    rows = sketch.floor(sketch.height / w);
    for (var i = 0; i < cols * rows; i++) {
      grid[i] = undefined;
    }

    // STEP 1
    var x = sketch.width / 2;
    var y = sketch.height / 2;
    var i = sketch.floor(x / w);
    var j = sketch.floor(y / w);
    var pos = sketch.createVector(x, y);
    grid[i + j * cols] = pos;
    active.push(pos);
    //frameRate(1);
  }

  sketch.draw = function () {
    sketch.background(0);
    //noLoop();

    sketch.translate(sketch.width/2, sketch.height/2);
    sketch.rotateY((sketch.millis() * 0.001));
    sketch.scale(2,2,2);
    // sketch.rotateY(sketch.sin(sketch.millis() * 0.001)*0.2);
    sketch.translate(-sketch.width/2, -sketch.height/2);

    for (var total = 0; total < 25; total++) {
      if (active.length > 0) {
        var randIndex = sketch.floor(sketch.random(active.length));
        var pos = active[randIndex];
        var found = false;
        for (var n = 0; n < k; n++) {
          var sample = p5.Vector.random2D();
          var m = sketch.random(r, 2 * r);
          sample.setMag(m);
          sample.add(pos);

          var col = sketch.floor(sample.x / w);
          var row = sketch.floor(sample.y / w);

          if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
            var ok = true;
            for (var i = -1; i <= 1; i++) {
              for (var j = -1; j <= 1; j++) {
                var index = (col + i) + (row + j) * cols;
                var neighbor = grid[index];
                if (neighbor) {
                  var d = p5.Vector.dist(sample, neighbor);
                  if (d < r) {
                    ok = false;
                  }
                }
              }
            }
            if (ok) {
              found = true;
              grid[col + row * cols] = sample;
              active.push(sample);
              let sz = sample.copy();
              // sz.z = sketch.random(-1, 1) * 50;
              sz.z = ordered.length * 0.02;
              ordered.push(sz);
              // Should we break?
              break;
            }
          }
        }

        if (!found) {
          active.splice(randIndex, 1);
        }

      }
    }

    for (var i = 0; i < ordered.length-1; i++) {
      if (ordered[i]) {
        sketch.stroke(255, 255);//i % 360, 100, 100);
        sketch.strokeWeight(r * 0.5);
        // sketch.line(ordered[i].x, ordered[i].y, i % 360 - 180,
        //   ordered[i+1].x, ordered[i+1].y, (i+1) % 360 - 180);
        // sketch.point(ordered[i].x, ordered[i].y, i*0.01 + (i % 255)*0.1 - 100)// % 360 - 180);
        sketch.point(ordered[i].x, ordered[i].y, ordered[i].z);
      }
    }

    // for (var i = 0; i < active.length; i++) {
    //   stroke(255, 0, 255);
    //   strokeWeight(1);
    //   point(active[i].x, active[i].y);
    // }
    //console.log(active.length);
  }

};

var myp5 = new p5(s);
