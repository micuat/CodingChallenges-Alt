// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Video: https://youtu.be/hbgDqyy8bIw

// instance mode by Naoto Hieda

var tentacle;

var s = function (sketch) {

  sketch.setup = function () {
      sketch.createCanvas(600, 400);

      let current = new Segment(sketch, 300, 200, 10, 0);

      for (let i = 0; i < 20; i++) {
        let next = new Segment(sketch, current, 10, i);
        current.child = next;
        current = next;
    
      }
      tentacle = current;
  }

  sketch.draw = function () {
    sketch.background(51);

    tentacle.follow(sketch.mouseX, sketch.mouseY);
    tentacle.update();
    tentacle.show();
  
    let next = tentacle.parent;
    while (next != null) {
      next.follow();
      next.update();
      next.show();
      next = next.parent;
    }
  }

};

var myp5 = new p5(s);
