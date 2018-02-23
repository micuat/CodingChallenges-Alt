// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JUDYkxU6J0o

// instance mode by Naoto Hieda

var s = function (sketch) {

  var img;
  var index0 = 0;
  var index1 = 0;
  var index2 = 0;
  var index3 = 0;

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    img = sketch.loadImage("../CC_Alt_47_PixelSortingAnimation/data/sunflower400.jpg");
    sorted0 = sketch.createImage(img.width, img.height, sketch.RGB);
    sorted0 = img.get();
    sorted1 = sketch.createImage(img.width, img.height, sketch.RGB);
    sorted1 = img.get();
    sorted2 = sketch.createImage(img.width, img.height, sketch.RGB);
    sorted2 = img.get();
    sorted3 = sketch.createImage(img.width, img.height, sketch.RGB);
    sorted3 = img.get();
  }

  sketch.draw = function () {
    console.log(sketch.frameRate());
    index0 = sketch.sortPixels(sorted0, 0, index0);
    index1 = sketch.sortPixels(sorted1, 1, index1);
    index2 = sketch.sortPixels(sorted2, 2, index2);
    index3 = sketch.sortPixels(sorted3, 3, index3);

    sketch.tint(255, 255);
    sketch.background(0);
    sketch.image(sorted0, 0, 0);
    sketch.image(sorted1, 400, 0);
    sketch.image(sorted3, 400, 400);
    sketch.image(sorted2, 0, 400);

    // sketch.tint(255, 100);
    // let n = sketch.noise(sketch.millis() * 0.001);
    // if(n > 0.75) sketch.image(img, 0, 0);
    // else if(n > 0.5) sketch.image(img, 0, 400);
    // else if(n > 0.25) sketch.image(img, 400, 0);
    // else sketch.image(img, 400, 400);
  }

  sketch.sortPixels = function (sorted, mode, index) {
    sorted.loadPixels();
    let stop = false;

    // Selection sort!
    for (let n = 0; n < 1000; n++) {
      let record = -1;
      let selectedPixel = index;
      for (let j = index; j < sorted.width + sketch.floor(index / sorted.width) * sorted.width && j < index + 100; j++) {
        let pix = sorted.pixels[j];
        let b;
        if (mode == 0) b = sketch.saturation(pix);
        else if (mode == 1) b = sketch.red(pix);
        else if (mode == 2) b = sketch.green(pix);
        else b = sketch.blue(pix);

        if (b > record) {
          selectedPixel = j;
          record = b;
        }
      }

      // Swap selectedPixel with i
      let temp = sorted.pixels[index];

      // if (index - sketch.floor(index / sorted.width) * sorted.width > 0) {
      //   let b0;
      //   if (mode == 0) b0 = sketch.red(sorted.pixels[index - 1]);
      //   else if (mode == 1) b0 = sketch.green(sorted.pixels[index - 1]);
      //   else b0 = sketch.blue(sorted.pixels[index - 1]);

      //   if (record - b0 < -100) stop = true;
      // }
      sorted.pixels[index] = sorted.pixels[selectedPixel];
      sorted.pixels[selectedPixel] = temp;

      if (index < sorted.pixels.length - 1) {
        if (stop) {
          index = (1 + sketch.floor(index / sorted.width)) * sorted.width;
          if (index >= sorted.pixels.length) index = sorted.pixels.length - 1;
        }
        else {
          index++;
        }
      }
      else {
        index = 0;
      }
    }
    sorted.updatePixels();
    return index;
  }
};

var myp5 = new p5(s);
