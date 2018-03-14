// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

// instance mode by Naoto Hieda

var font;
var vehicles = [];

var s = function (sketch) {
  sketch.preload = function () {
    if(sketch.isLiveJs) {
      // font = sketch.createFont('../CC_59_Steering_Text_Paths/AvenirNextLTPro-Demi.otf', 192);
    }
    else {
      font = sketch.loadFont('AvenirNextLTPro-Demi.otf');
    }
  }

  sketch.setup = function () {
    sketch.createCanvas(600, 300);
    sketch.background(51);
    // textFont(font);
    // textSize(192);
    // fill(255);
    // noStroke();
    // text('train', 100, 200);

    var points;
    if(sketch.isLiveJs) {
      // otf not supported
      font = new Packages.geomerative.RFont(sketch.sketchPath("../CC_59_Steering_Text_Paths/BAUHS93.TTF"), 192, sketch.LEFT);
      print(font)
 
      Packages.geomerative.RCommand.setSegmentLength(5); // 5 = many points; 125 = only a few points 
      Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);
     
      grp = font.toGroup('train');
      textW = grp.getWidth();
      rpoints = grp.getPoints();
      points = [];
      for (var i = 0; i < rpoints.length; i++) {
        points.push({x: rpoints[i].x + 100, y: rpoints[i].y + 200});
      }
    }
    else {
      points = font.textToPoints('train', 100, 200, 192, {
        sampleFactor: 0.25
      });
    }

    for (var i = 0; i < points.length; i++) {
      var pt = points[i];
      var vehicle = new Vehicle(sketch, pt.x, pt.y);
      vehicles.push(vehicle);
      // stroke(255);
      // strokeWeight(8);
      // point(pt.x, pt.y);
    }
  }

  sketch.draw = function () {
    sketch.background(51);
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
      v.update();
      v.show();
    }
  }

};

var myp5 = new p5(s);