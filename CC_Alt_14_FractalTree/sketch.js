// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/0jjeOYMjmDU

// instance mode by Naoto Hieda

var angle = 0;
var slider;
var count;

var prepreprev = [];
var preprev = [];
var prev = [];
var cur = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(400, 400);
    // slider = sketch.createSlider(0, sketch.TWO_PI, sketch.PI / 4, 0.01);
  }

  sketch.draw = function () {
    sketch.background(0);
    // angle = slider.value();
    var time = sketch.millis() % 5000;
    angle = sketch.map(time, 0, 5000, sketch.TWO_PI, 0);
    // if(time > 5000) time = 10000 - time;
    // angle = sketch.map(time, 0, 5000, sketch.TWO_PI, 0);
    count = 0;
    sketch.stroke(255, 150);
    sketch.translate(200, sketch.height);
    sketch.branch(100);

    sketch.translate(-200, -sketch.height);
    if(prev.length > 0 && preprev.length > 0 && prepreprev.length > 0) {
      for(var i in cur) {
        // sketch.beginShape();
        // sketch.curveVertex(cur[i][0], cur[i][1]);
        // sketch.curveVertex(cur[i][0], cur[i][1]);
        // sketch.curveVertex(prev[i][0], prev[i][1]);
        // sketch.curveVertex(preprev[i][0], preprev[i][1]);
        // sketch.curveVertex(prepreprev[i][0], prepreprev[i][1]);
        // sketch.curveVertex(prepreprev[i][0], prepreprev[i][1]);
        // sketch.endShape();

        // sketch.line(cur[i][0], cur[i][1], prev[i][0], prev[i][1]);
        // sketch.line(preprev[i][0], preprev[i][1], prev[i][0], prev[i][1]);
        // sketch.line(preprev[i][0], preprev[i][1], prepreprev[i][0], prepreprev[i][1]);

        // sketch.point(cur[i][0], cur[i][1]);
      }
    }
    prepreprev = preprev;
    preprev = prev;
    prev = cur;
    cur = [];
  }

  sketch.branch = function (len) {
    count++;
    sketch.line(0, 0, 0, -len);
    // cur.push([sketch.modelX(0,0,0), sketch.modelY(0,0,0)]);
    sketch.translate(0, -len);
    if (len > 4) {
      sketch.push();
      sketch.rotate(angle + sketch.noise(count * 0.01));
      sketch.branch(len * 0.7);
      sketch.pop();
      sketch.push();
      sketch.rotate(-angle - sketch.noise(count * 0.01));
      sketch.branch(len * 0.7);
      sketch.pop();
    }

    //line(0, 0, 0, -len * 0.67);
  }
};

var myp5 = new p5(s);
