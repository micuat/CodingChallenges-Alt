// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/aKiyCeIuwn4

// instance mode by Naoto Hieda

var bird;
var pipes = [];
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 600);
    mic = new p5.AudioIn();
    mic.start();
    bird = new Bird(sketch);
    pipes.push(new Pipe(sketch));
    sliderTop = sketch.createSlider(0, 1, 0.3, 0.01);
    sliderBottom = sketch.createSlider(0, 1, 0.1, 0.01);
  }

  sketch.draw = function () {
    sketch.background(0);

    var vol = mic.getLevel();


    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      if (pipes[i].hits(bird)) {
        console.log("HIT");
      }


      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }


    }

    bird.update();
    bird.show();

    if (sketch.frameCount % 100 == 0) {
      pipes.push(new Pipe(sketch));
    }

    var thresholdTop = sliderTop.value();
    var thresholdBottom = sliderBottom.value();

    if (vol > thresholdTop && !clapping) {
      bird.up();
      clapping = true;
    }

    if (vol < thresholdBottom) {
      clapping = false;
    }

    sketch.fill(0, 255, 0);
    //console.log(vol);
    sketch.noStroke();
    var y = sketch.map(vol, 0, 1, sketch.height, 0);
    sketch.rect(sketch.width - 50, y, 50, sketch.height - y);

    var ty = sketch.map(thresholdTop, 0, 1, sketch.height, 0);
    sketch.stroke(255, 0, 0);
    sketch.strokeWeight(4);
    sketch.line(sketch.width - 50, ty, sketch.width, ty);

    var by = sketch.map(thresholdBottom, 0, 1, sketch.height, 0);
    sketch.stroke(0, 0, 255);
    sketch.strokeWeight(4);
    sketch.line(sketch.width - 50, by, sketch.width, by);


  }

  sketch.keyPressed = function () {
    if (sketch.key == ' ') {
      bird.up();
      //console.log("SPACE");
    }
  }

};

var myp5 = new p5(s);
