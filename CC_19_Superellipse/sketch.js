// Coding Rainbow

// instance mode by Naoto Hieda

function sgn(val) {
  if (val > 0)
    return 1;
  else if (val < 0)
    return -1;
  else
    return 0;
}

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
  }

  sketch.draw = function () {
    sketch.background(51);
    sketch.translate(sketch.width / 2, sketch.height / 2);

    var a = 100;
    var b = 100;
    var n = sketch.map(sketch.mouseX, 0, sketch.width, 0, 10);
    // var r = 100;

    sketch.stroke(255);
    sketch.noFill();

    sketch.beginShape();
    for (var angle = 0; angle < sketch.TWO_PI; angle += 0.1) {
      // var x = r * sketch.cos(a);
      // var y = r * sketch.sin(a);

      var na = 2 / n;
      var x = sketch.pow(sketch.abs(sketch.cos(angle)), na) * a * sgn(sketch.cos(angle));
      var y = sketch.pow(sketch.abs(sketch.sin(angle)), na) * b * sgn(sketch.sin(angle));

      sketch.vertex(x, y);
    }
    sketch.endShape(sketch.CLOSE);
  }

};

var myp5 = new p5(s);
