// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ksRoh-10lak

// instance mode by Naoto Hieda

var slider;

var n1 = 0.3;
var n2 = 0.3;
var n3 = 0.3;
var m = 5;
var a = 1;
var b = 1;

var osc = 0;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    slider = sketch.createSlider(0, 10, 5, 1);
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
    m = sketch.map(sketch.sin(osc), -1, 1, 0, 10); //slider.value();
    osc += 0.02;

    sketch.background(51);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    sketch.stroke(255);
    sketch.noFill();

    var radius = 100;

    var total = 200;
    var increment = sketch.TWO_PI / total;

    sketch.beginShape();
    for (var angle = 0; angle < sketch.TWO_PI; angle += increment) {
      var r = sketch.supershape(angle);
      var x = radius * r * sketch.cos(angle);
      var y = radius * r * sketch.sin(angle);

      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);


  }

};

var myp5 = new p5(s);
