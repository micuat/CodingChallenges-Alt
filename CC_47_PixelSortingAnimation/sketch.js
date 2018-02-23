// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JUDYkxU6J0o

// instance mode by Naoto Hieda

var s = function (sketch) {

  var img;
  var sorted;
  var index = 0;

  sketch.setup = function () {
    sketch.createCanvas(800, 400);

    img = sketch.loadImage("../CC_47_PixelSortingAnimation/data/sunflower400.jpg");
    sorted = sketch.createImage(img.width, img.height, sketch.RGB);
    sorted = img.get();
  }

  sketch.draw = function () {
    console.log(sketch.frameRate());

    sorted.loadPixels();

    // Selection sort!
    for (let n = 0; n < 10; n++) {
      let record = -1;
      let selectedPixel = index;
      for (let j = index; j < sorted.pixels.length; j++) {
        let pix = sorted.pixels[j];
        let b = sketch.hue(pix);
        if (b > record) {
          selectedPixel = j;
          record = b;
        }
      }

      // Swap selectedPixel with i
      let temp = sorted.pixels[index];
      sorted.pixels[index] = sorted.pixels[selectedPixel];
      sorted.pixels[selectedPixel] = temp;

      if (index < sorted.pixels.length - 1) {
        index++;
      }
    }


    sorted.updatePixels();

    sketch.background(0);
    sketch.image(img, 0, 0);
    sketch.image(sorted, 400, 0);
  }

};

var myp5 = new p5(s);
