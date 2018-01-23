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

var rings = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800, sketch.WEBGL);

    for(var i = 0; i < 32; i++) {
      rings.push(0);
    }
  }

  sketch.draw = function () {
    sketch.background(0);
    // sketch.translate(sketch.width / 2, sketch.height / 2);

    var a = 200;
    var b = 200;
    var t = sketch.millis() * 0.0002;
    // var rot = sketch.map(t, 0, 10, 0, sketch.PI * 2);
    // rot = sketch.constrain(rot, 0, sketch.PI / 4);
    sketch.rotateX(-sketch.PI / 6);
    // sketch.rotateY(t);
    sketch.rotateY(sketch.HALF_PI);
    // var r = 100;

    sketch.stroke(255);
    sketch.noFill();

    if(sketch.frameCount % 120 == 0) {
      rings[0] += 2;
    }
    for (var i = 0; i < rings.length; i++) {
      var n = sketch.map(sketch.sin(i * 0.2 + t * 10) + 0* sketch.sin(-i * 0.2 + t * 1), -1, 1, 0.2, 10);
      n = sketch.constrain(sketch.sin(n * 0.1), 0.2, 5);

      sketch.push();
      sketch.translate(0, 0, (rings.length/2-i-0.5) * 20);
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
      sketch.pop();

      var p = 0.5;
      if(i > 0) {
        rings[i] = rings[i] * p + (1 - p) * rings[i-1];
      }
      else {
        rings[i] *= p;
      }
    }
  }

};

var myp5 = new p5(s);
