// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

// instance mode by Naoto Hieda

var minval = -0.5;
var maxval = 0.5;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(200, 200);
    p.pixelDensity(1);
  }

  p.draw = function () {
    let maxiterations = 100;

    p.loadPixels();
    if(p.pixels == null) return;
    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {

        let minValue = p.map(p.mouseX, 0, p.width, -2.5, 0);
        let maxValue = p.map(p.mouseY, 0, p.height, 0, 2.5);
        let a = p.map(x, 0, p.width, minValue, maxValue);
        let b = p.map(y, 0, p.height, minValue, maxValue);

        let ca = a;
        let cb = b;

        let n = 0;

        while (n < maxiterations) {
          let aa = a * a - b * b;
          let bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 16) {
            break;
          }
          n++;
        }

        let bright = p.map(n, 0, maxiterations, 0, 1);
        bright = p.map(p.sqrt(bright), 0, 1, 0, 255);

        if (n == maxiterations) {
          bright = 0;
        }

        if(p.isLiveJs == true) {
          p.pixels[(x + y * p.width)] = pApplet.color(bright);
        }
        else {
          let pix = (x + y * p.width) * 4;
          p.pixels[pix + 0] = bright;
          p.pixels[pix + 1] = bright;
          p.pixels[pix + 2] = bright;
          p.pixels[pix + 3] = 255;
        }
      }
    }
    p.updatePixels();
  }

};

var p021 = new p5(s);
