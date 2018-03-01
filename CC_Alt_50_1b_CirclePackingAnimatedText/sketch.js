// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

// instance mode by Naoto Hieda

var circles;
var spots0;
var spots1;
var img;
var done = false;

var s = function (sketch) {

  sketch.makeList = function (image) {
    image.loadPixels();
    spots = [];
    circles = [];
    for (var x = 0; x < image.width; x++) {
      for (var y = 0; y < image.height; y++) {
        var index = x + y * image.width;
        var c, b;
        if(sketch.isLiveJs) {
          c = image.pixels[index];
        }
        else {
          c = image.pixels[index * 4];
        }
        b = sketch.brightness([c]);
        if (b > 1) {
          spots.push(sketch.createVector(x, y));
        }
      }
    }
    return spots;
  }

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    img = sketch.createGraphics(800, 800);
    img.beginDraw();
    img.background(0);
    img.fill(255);
    img.ellipse(200, 200, 500, 500);
    img.endDraw();
    var density = sketch.displayDensity();
    sketch.pixelDensity(1);

    spots0 = sketch.makeList(img);

    img.beginDraw();
    img.background(0);
    img.fill(255);
    img.translate(600, 600);
    img.rotate(sketch.PI/4);
    img.rectMode(sketch.CENTER);
    img.rect(0, 0, 500, 500);
    // img.ellipse(600, 600, 600, 600);
    img.endDraw();

    spots1 = sketch.makeList(img);

    console.log(img.width);
    console.log(img.height);
    console.log("pixels", img.pixels.length);
    console.log("spots", spots.length);
    console.log(density)
  }

  sketch.draw = function () {
    if(done) return;
    sketch.background(0);
    // frameRate(20)

    var total = 5;
    var count = 0;
    var attempts = 0;

    while (count < total) {
      let type = sketch.random(1) > 0.5 ? 0 :1;
      var newC;
      if(type == 0) {
        newC = sketch.newCircle(spots0, type);
      }
      else {
        newC = sketch.newCircle(spots1, type);
      }
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if (attempts > 1000) {
        done = true;
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

  sketch.newCircle = function (spots, type) {
    var spot = sketch.random(spots);
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
      return new Circle(sketch, x, y, type);
    } else {
      return null;
    }
  }

};

var myp5 = new p5(s);
