// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ksRoh-10lak

// instance mode by Naoto Hieda

var n1 = 0.3;
var n2 = 0.3;
var n3 = 0.3;
var m = 5;
var a = 1;
var b = 1;

var osc = 0;

var s = function (sketch) {
  this.points = [];

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
  }

  sketch.supershape = function (theta) {

    var part1 = (1 / a) * sketch.cos(theta * m / 4);
    part1 = sketch.abs(part1);
    part1 = sketch.pow(part1, n2);

    var part2 = (1 / b) * sketch.sin(theta * m / 4);
    part2 = sketch.abs(part2);
    part2 = sketch.pow(part2, n3);

    var part3 = sketch.pow(part1 + part2, 1 / n1);

    if (part3 === 0) {
      return 0;
    }

    return (1 / part3);
  }


  sketch.draw = function () {
    m = sketch.map(sketch.sin(osc), -1, 1, 1, 3); //slider.value();
    m = sketch.pow(2, m);
    osc += 0.02;

    sketch.background(0);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.stroke(255);
    sketch.noFill();

    var radius = sketch.width * 0.5 * 4;

    var total = 200;
    var increment = sketch.TWO_PI / total;
    sketch.strokeWeight(2);

    sketch.beginShape(sketch.POINTS);
    // sketch.beginShape(sketch.LINE_STRIP);
    // var i = 0;
    let c = (-sketch.sin(m*4)+1);
    for (var angle = -sketch.TWO_PI; angle < sketch.TWO_PI; angle += increment) {
      var r = sketch.supershape(angle);

      for (var i = 0; i < 3 + (-sketch.cos(angle * m) + 1) * 7; i++) {
        var amp = sketch.randomGaussian() * c * 0.1 + 1;
        var aa = sketch.randomGaussian() * c * increment * 1;

        var y = radius * r * sketch.cos(angle + aa) * amp;
        var x = radius * r * sketch.sin(angle + aa) * amp;

        sketch.vertex(x, y);
      }
    }
    sketch.endShape(sketch.CLOSE);
  }

};

var myp5 = new p5(s);
