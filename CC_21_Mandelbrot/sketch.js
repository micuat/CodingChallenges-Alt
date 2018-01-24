// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

// instance mode by Naoto Hieda

var minval = -0.5;
var maxval = 0.5;

var minSlider;
var maxSlider;

var frDiv;

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(200, 200);
    sketch.pixelDensity(1);

    minSlider = sketch.createSlider(-2.5, 0, -2.5, 0.01);
    maxSlider = sketch.createSlider(0, 2.5, 2.5, 0.01);

    frDiv = sketch.createDiv('');
  }

  sketch.draw = function () {
    var maxiterations = 100;

    sketch.loadPixels();
    for (var x = 0; x < sketch.width; x++) {
      for (var y = 0; y < sketch.height; y++) {

        var a = sketch.map(x, 0, sketch.width, minSlider.value(), maxSlider.value());
        var b = sketch.map(y, 0, sketch.height, minSlider.value(), maxSlider.value());

        var ca = a;
        var cb = b;

        var n = 0;

        while (n < maxiterations) {
          var aa = a * a - b * b;
          var bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 16) {
            break;
          }
          n++;
        }

        var bright = sketch.map(n, 0, maxiterations, 0, 1);
        bright = sketch.map(sketch.sqrt(bright), 0, 1, 0, 255);

        if (n == maxiterations) {
          bright = 0;
        }

        var pix = (x + y * sketch.width) * 4;
        sketch.pixels[pix + 0] = bright;
        sketch.pixels[pix + 1] = bright;
        sketch.pixels[pix + 2] = bright;
        sketch.pixels[pix + 3] = 255;
      }
    }
    sketch.updatePixels();

    frDiv.html(sketch.floor(sketch.frameRate()));
  }

};

var myp5 = new p5(s);
