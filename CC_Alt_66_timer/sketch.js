// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Timer
// https://youtu.be/MLtAMg9_Svw

// instance mode by Naoto Hieda

var timeleft = 60;

var startTime = 0;
var currentTime = 0;

var font;
var rpoints, points;

var s = function (sketch) {

  sketch.convertSeconds = function (s) {
    if(s < 0) s = 0;
    var min = sketch.floor(s / 60);
    var sec = s % 60;
    return sketch.nf(min, 2) + ':' + sketch.nf(sec, 2);
  }

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    startTime = sketch.millis();

    // otf not supported
    font = new Packages.geomerative.RFont(sketch.sketchPath("../CC_Alt_66_timer/HelveticaNeueMedium.ttf"), 300, sketch.LEFT);
    print(font)

    Packages.geomerative.RCommand.setSegmentLength(5); // 5 = many points; 125 = only a few points 
    Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);
  }

  sketch.draw = function () {
    sketch.background(255);

    currentTime = (sketch.millis() - startTime) / 1000;
    let t = sketch.convertSeconds(timeleft - sketch.floor(currentTime));
    // sketch.textSize(64);
    // sketch.text(t, 100, 400);

    sketch.translate(sketch.width / 2 - 375, sketch.height / 2 + 300/4);
    grp = font.toGroup(t);

    sketch.fill(0, 255);
    sketch.noStroke();
    grp.draw();

    sketch.stroke(0, 255);
    sketch.strokeWeight(3);
    
    textW = grp.getWidth();
    rpoints = grp.getPoints();
    points = [];
    for (let i = 0; i < rpoints.length; i++) {
      points.push(sketch.createVector(rpoints[i].x, rpoints[i].y));
    }
    
    for (let i = 0; i < points.length; i++) {
      if(i == points.length-1) break;
      let p = points[i];
      let pn = points[i+1];

      if(p.dist(pn) > 10) continue;

      let r = (sketch.noise(i * 0.1, sketch.frameCount * 0.9)-0.5) * 40;
      let rn = (sketch.noise((i+1) * 0.1, sketch.frameCount * 0.9)-0.5) * 40;
      if((currentTime % 1) > 0.1 && (currentTime % 1) < 0.9) r = rn = 0;
      sketch.line(p.x+r, p.y, pn.x+rn, pn.y);
      // for (let j = 0; j < 10; j++) {
      //   let x = p.x + sketch.randomGaussian() * 1.5;
      //   let y = p.y + sketch.randomGaussian() * 1.5;
      //   sketch.point(x + r, y);
      // }
    }

  }
};

var myp5 = new p5(s);
