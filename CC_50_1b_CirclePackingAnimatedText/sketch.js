// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

// instance mode by Naoto Hieda

var circles;
var spots;
var img;

var s = function (sketch) {

  sketch.preload = function () {
    img = sketch.loadImage("assets/2017.png");
  }

  sketch.setup = function () {
    if(sketch.isLiveJs)
      img = sketch.loadImage("../CC_50_1b_CirclePackingAnimatedText/assets/2017.png");
    sketch.createCanvas(900, 400);
    var density = sketch.displayDensity();
    sketch.pixelDensity(1);
    img.loadPixels();
    spots = [];
    circles = [];
    for (var x = 0; x < img.width; x++) {
      for (var y = 0; y < img.height; y++) {
        var index = x + y * img.width;
        var c, b;
        if(sketch.isLiveJs) {
          c = img.pixels[index];
        }
        else {
          c = img.pixels[index * 4];
        }
        b = sketch.brightness([c]);
        if (b > 1) {
          spots.push(sketch.createVector(x, y));
        }
      }
    }

    console.log(img.width);
    console.log(img.height);
    console.log("pixels", img.pixels.length);
    console.log("spots", spots.length);
    console.log(density)
  }

  sketch.draw = function () {
    sketch.background(0);
    // frameRate(20)

    var total = 10;
    var count = 0;
    var attempts = 0;

    while (count < total) {
      var newC = sketch.newCircle();
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if (attempts > 1000) {
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

              if (d - 5 < distance) {
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
    var r = sketch.floor(sketch.random(0, spots.length));
    var spot = spots[r];
    var x = spot.x;
    var y = spot.y;

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
