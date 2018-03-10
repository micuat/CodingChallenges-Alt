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
var temp = 0;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    // sliderD = sketch.createSlider(1, 20, 10, 1);
    // sliderN = sketch.createSlider(1, 20, 10, 1);
    // sliderD.input(sketch.draw);
    // sliderN.input(sketch.draw);
  }

  sketch.draw = function () {
    let ai = 1.5;
    let t = sketch.millis() * 0.0001 * sketch.TWO_PI;
    if(sketch.millis() * 0.001 % 4 < 3) {
      temp += 0.01;
    }
    else {
      temp += 0.001;
    }
    d = 13;//sketch.floor(sketch.map(sketch.cos(t), -ai, ai, 1, 20));
    n = 9;//sketch.map(sketch.sin(t), -ai, ai, 9, 12);
    var k = n / d;
    // n = sketch.floor(n);
    // d = sketch.floor(n);
    sketch.background(0);
    sketch.push();
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.beginShape();
    sketch.stroke(255);
    sketch.noFill();
    sketch.strokeWeight(1);
    let amax = temp % 1 * (sketch.TWO_PI * reduceDenominator(n, d)/2);
    for (var a = 0; a < sketch.TWO_PI * reduceDenominator(n, d)/2; a += 0.02) {
      sketch.stroke((a+amax) / (sketch.TWO_PI * reduceDenominator(n, d) / 2) * 255);
      var r = 300 * sketch.cos(sketch.map(sketch.sin(t), -ai, ai, 7, 9)/d * (a+amax));
      var x = r * sketch.cos((a+amax));
      var y = r * sketch.sin((a+amax));
      sketch.vertex(x, y);
    }
    sketch.endShape();
    // sketch.endShape(sketch.CLOSE);
    sketch.pop();
  }

  function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
      return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
  }

};

var myp5 = new p5(s);
