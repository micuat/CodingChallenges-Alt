// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/LG8ZK-rRkXo

// instance mode by Naoto Hieda

var s = function (p) {

  let a = 0;

  let sponge = [];

  p.setup = function () {
    p.createCanvas(400, 400, p.WEBGL);

    // An array of Box objects
    // Star with one
    let b = new Box(0, 0, 0, 200);
    sponge.push(b);
  }

  p.mousePressed = function () {
    // Generate the next set of boxes
    let next = [];
    for (let i = 0; i < sponge.length; i++) {
      let b = sponge[i];
      let newBoxes = b.generate();
      next = next.concat(newBoxes);
    }
    sponge = next;
  }

  p.draw = function () {
    p.background(51);
    p.rotateX(a);
    p.rotateY(a * 0.4);
    p.rotateZ(a * 0.1);
    if(p.isLiveJs) p.lights();
    // Show what you've got!
    for (let i = 0; i < sponge.length; i++) {
      sponge[i].show();
    }
    a += 0.01;
  }
};

var p002 = new p5(s);