// instance mode by Naoto Hieda

var kitten, kittenOrg;


var s = function (p) {

  p.preload = function () {
    kitten = p.loadImage("../CC_90_dithering/data/kitten.jpg");
    kittenOrg = p.loadImage("../CC_90_dithering/data/kitten.jpg");
  }

  p.setup = function () {
    p.createCanvas(1024, 512);

    p.image(kittenOrg, 0, 0);
    makeDithered(kitten, 1);
    p.image(kitten, 512, 0);
    // Apply gray filter to the whole canvas
    p.filter(p.GRAY);
  }

  function imageIndex(img, x, y) {
    return 1 * (x + y * img.width);
  }

  function getColorAtindex(img, x, y) {
    let idx = imageIndex(img, x, y);
    let pix = img.pixels;
    // let red = p.red(pix[idx]);
    // let green = p.green(pix[idx]);
    // let blue = p.blue(pix[idx]);
    // let alpha = p.alpha(pix[idx]);
    // return p.color(red, green, blue, alpha);
    return pix[idx];
  }

  function setColorAtIndex(img, x, y, clr) {
    let idx = imageIndex(img, x, y);

    let pix = img.pixels;
    // pix[idx] = p.red(clr);
    // pix[idx + 1] = p.green(clr);
    // pix[idx + 2] = p.blue(clr);
    // pix[idx + 3] = p.alpha(clr);
    pix[idx] = clr;
  }

  // Finds the closest step for a given value
  // The step 0 is always included, so the number of steps
  // is actually steps + 1
  function closestStep(max, steps, value) {
    return p.round(steps * value / 255) * p.floor(255 / steps);
  }

  function makeDithered(img, steps) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        let clr = getColorAtindex(img, x, y);
        let oldR = p.red(clr);
        let oldG = p.green(clr);
        let oldB = p.blue(clr);
        let newR = closestStep(255, steps, oldR);
        let newG = closestStep(255, steps, oldG);
        let newB = closestStep(255, steps, oldB);

        let newClr = p.color(newR, newG, newB);
        setColorAtIndex(img, x, y, newClr);

        let errR = oldR - newR;
        let errG = oldG - newG;
        let errB = oldB - newB;

        distributeError(img, x, y, errR, errG, errB);
      }
    }

    img.updatePixels();
  }

  function distributeError(img, x, y, errR, errG, errB) {
    addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
  }

  function addError(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
    let clr = getColorAtindex(img, x, y);
    let r = p.red(clr);
    let g = p.green(clr);
    let b = p.blue(clr);
    clr = p.color(r + errR * factor, g + errG * factor, b + errB * factor);

    setColorAtIndex(img, x, y, clr);
  }

};

var myp5 = new p5(s);
