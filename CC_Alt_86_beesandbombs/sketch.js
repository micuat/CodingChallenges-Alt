// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/H81Tdrmz2LA

// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

// instance mode by Naoto Hieda

var angle = 0;
var w = 40;
var ma;
var maxD;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(800, 800, p.WEBGL);
    ma = p.atan(p.cos(p.QUARTER_PI));
    maxD = p.dist(0, 0, 300, 300);
  }

  p.draw = function () {
    p.background(255);
    p.noStroke();
    p.fill(255);
    // p.ortho(-400, 400, 400, -400, 0, 1000);

    p.translate(0, 0, -500);
    p.rotateX(-p.QUARTER_PI * 0.8);
    p.rotateY(-p.QUARTER_PI)
    p.directionalLight(90, 95, 226, -1, 0, 0);
    p.pointLight(200, 95, 96, 300, -100, 1000);
    p.pointLight(200, 200, 200, 0, -1000, 0);

    angle = p.millis() * 0.001 * p.TWO_PI;
    let decay = p.sin(p.millis() * 0.001);
    decay = p.constrain(p.map(decay, -1, 1, -0.02, 1), 0, 1);
    for (let z = 0; z < p.height; z += w) {
      for (let x = 0; x < p.width; x += w) {
        p.push();
        let d = p.dist(x, z, p.width / 2, p.height / 2);
        let offset = p.map(d, 0, maxD, -p.PI, p.PI);
        let a = angle + -offset;
        let h = p.floor(p.map(p.sin(a), -1, 1, 0.5, 1)*p.height);
        h = p.map(decay, 0, 1, p.height, h);
        p.translate(x - p.width / 2, 0, z - p.height / 2);
        // p.normalMaterial();
        p.box(w, h, w);
        //rect(x - width / 2 + w / 2, 0, w - 2, h);
        p.pop();
      }
    }

  }

};

var myp5 = new p5(s);
