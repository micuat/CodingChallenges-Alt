// Daniel Shiffman
// http://codingtra.in
// Mathematical Roses
// Video: https://youtu.be/f5QBExMNB1I
// Based on: https://en.wikipedia.org/wiki/Rose_(mathematics)

// instance mode by Naoto Hieda

var d = 8;
var n = 5;
var sliderD;
var sliderN;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    sliderD = sketch.createSlider(1, 20, 10, 1);
    sliderN = sketch.createSlider(1, 20, 10, 1);
    sliderD.input(sketch.draw);
    sliderN.input(sketch.draw);
  }

  sketch.draw = function () {
    d = sliderD.value();
    n = sliderN.value();
    var k = n / d;
    sketch.background(51);
    sketch.push();
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.beginShape();
    sketch.stroke(255);
    sketch.noFill();
    sketch.strokeWeight(1);
    for (var a = 0; a < sketch.TWO_PI * reduceDenominator(n, d); a += 0.02) {
      var r = 200 * sketch.cos(k * a);
      var x = r * sketch.cos(a);
      var y = r * sketch.sin(a);
      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
    sketch.pop();
    sketch.noLoop();
  }

  function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }

};

var myp5 = new p5(s);
