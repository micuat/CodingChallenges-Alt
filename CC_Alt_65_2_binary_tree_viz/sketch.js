// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Binary Tree
// Part 1: https://youtu.be/ZNH0MuQ51m4
// Part 2: https://youtu.be/KFEvF_ymuzY

// instance mode by Naoto Hieda

var tentacles;
var tree;

var endTime = -1;

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    tentacles = [];

    // let da = sketch.TWO_PI / 2;
    // for (let a = 0; a < sketch.TWO_PI; a += da) {
    //   let x = sketch.width / 2 + sketch.cos(a) * 300;
    //   let y = sketch.height / 2 + sketch.sin(a) * 300;
    //   tentacles.push(new Tentacle(sketch, x, y));
    // }

    sketch.initTree();
    console.log(tree);
  }

  sketch.initTree = function () {
    tree = new Tree(sketch);
    tentacles = [];
    for (var i = 0; i < 30; i++) {
      tentacle = tree.addValue(sketch.floor(sketch.random(0, 255)));
      if (tentacle != null) {
        tentacles.push(tentacle);
      }
    }
    endTime = -1;
  }

  sketch.draw = function () {
    sketch.background(0);

    for (let i in tentacles) {
      let t = tentacles[i];
      t.update(sketch.createVector(sketch.mouseX, sketch.mouseY));
      t.show();
    }

    let everyoneHasArrived = tree.traverse();
    if (everyoneHasArrived) {
      if (endTime > 0 && sketch.millis() * 0.001 - endTime > 0.5) {
        sketch.initTree();
      }
      else if (endTime < 0) {
        endTime = sketch.millis() * 0.001;
      }
    }

  }

};

var myp5 = new p5(s);
