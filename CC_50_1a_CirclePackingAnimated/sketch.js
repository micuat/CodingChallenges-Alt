// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

// instance mode by Naoto Hieda

var circles;


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(640, 360);
    circles = [];
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.frameRate(20)

    var total = 5;
    var count = 0;
    var attempts = 0;

    while (count < total) {
      var newC = sketch.newCircle();
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if (attempts > 100) {
        sketch.noLoop();
        console.log("finished");
        break;
      }
    }

    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];

      if (circle.growing) {
        if (circle.edges()) {
          circle.growing = false;
        } else {
          for (var j = 0; j < circles.length; j++) {
            var other = circles[j];
            if (circle !== other) {
              var d = sketch.dist(circle.x, circle.y, other.x, other.y);
              var distance = circle.r + other.r;

              if (d - 2 < distance) {
                circle.growing = false;
                break;
              }
            }
          }
        }
      }

      circle.show();
      circle.grow();
    }
  }

  sketch.newCircle = function () {
    var x = sketch.random(sketch.width);
    var y = sketch.random(sketch.height);
    var valid = true;
    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];
      var d = sketch.dist(x, y, circle.x, circle.y);
      if (d < circle.r) {
        valid = false;
        break;
      }
    }
    if (valid) {
      return new Circle(sketch, x, y);
    } else {
      return null;
    }
  }

};

var myp5 = new p5(s);
