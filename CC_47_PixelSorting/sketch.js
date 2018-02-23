// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JUDYkxU6J0o

// instance mode by Naoto Hieda

var s = function (sketch) {

  var img;
  var sorted;

  sketch.setup = function () {
    sketch.createCanvas(400, 200);

    img = sketch.loadImage("../CC_47_PixelSorting/data/sunflower.jpg");
    sorted = img.get();
    sorted.loadPixels();

    // Selection sort!
    for (let i = 0; i < sorted.pixels.length; i++) {
      let record = -1;
      let selectedPixel = i;
      for (let j = i; j < sorted.pixels.length; j++) {
        let pix = sorted.pixels[j];
        // Sort by hue
        let b = sketch.hue(pix);
        if (b > record) {
          selectedPixel = j;
          record = b;
        }
      }

      // Swap selectedPixel with i
      let temp = sorted.pixels[i];
      sorted.pixels[i] = sorted.pixels[selectedPixel];
      sorted.pixels[selectedPixel] = temp;
    }

    sorted.updatePixels();
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.image(img, 0, 0);
    sketch.image(sorted, 200, 0);
  }

};

var myp5 = new p5(s);
