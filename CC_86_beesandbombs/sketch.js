// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Video: https://youtu.be/H81Tdrmz2LA

// Original GIF: https://beesandbombs.tumblr.com/post/149654056864/cube-wave

// instance mode by Naoto Hieda

var angle = 0;
var w = 24;
var ma;
var maxD;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(400, 400, p.WEBGL);
    ma = p.atan(p.cos(p.QUARTER_PI));
    maxD = p.dist(0, 0, 200, 200);
  }

  p.draw = function () {
    p.background(100);
    p.ortho(-400, 400, 400, -400, 0, 1000);
    p.rotateX(-ma);
    p.rotateY(-p.QUARTER_PI)
    p.lights();

    for (let z = 0; z < p.height; z += w) {
      for (let x = 0; x < p.width; x += w) {
        p.push();
        let d = p.dist(x, z, p.width / 2, p.height / 2);
        let offset = p.map(d, 0, maxD, -p.PI, p.PI);
        let a = angle + offset;
        let h = p.floor(p.map(p.sin(a), -1, 1, 100, 300));
        p.translate(x - p.width / 2, 0, z - p.height / 2);
        // p.normalMaterial();
        p.box(w, h, w);
        //rect(x - width / 2 + w / 2, 0, w - 2, h);
        p.pop();
      }
    }

    angle -= 0.1;
  }

};

var myp5 = new p5(s);
