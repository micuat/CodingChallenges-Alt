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
    }
    else {
      font = sketch.loadFont('AvenirNextLTPro-Demi.otf');
    }
  }

  sketch.setup = function () {
    sketch.createCanvas(800, 800);

    var points, points2;
    if(sketch.isLiveJs) {
      // otf not supported
      font = new Packages.geomerative.RFont(sketch.sketchPath("../CC_59_Steering_Text_Paths/BAUHS93.TTF"), 192, sketch.LEFT);
      print(font)
 
      Packages.geomerative.RCommand.setSegmentLength(5); // 5 = many points; 125 = only a few points 
      Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);
     
      grp = font.toGroup('coding');
      textW = grp.getWidth();
      rpoints = grp.getPoints();
      points = [];
      for (var i = 0; i < rpoints.length; i++) {
        points.push({x: rpoints[i].x + 100, y: rpoints[i].y + 330});
      }
      grp = font.toGroup('train');
      textW = grp.getWidth();
      rpoints = grp.getPoints();
      points2 = [];
      for (var i = 0; i < rpoints.length; i++) {
        points2.push({x: rpoints[i].x + 100, y: rpoints[i].y + 530});
      }
    }
    else {
      points = font.textToPoints('train', 100, 200, 192, {
        sampleFactor: 0.25
      });
    }

    for (var i = 0; i < points.length * 2; i++) {
      var pt = sketch.random(points);
      var pt2 = sketch.random(points2);
      var vehicle = new Vehicle(sketch, pt.x, pt.y, pt2.x, pt2.y);
      vehicles.push(vehicle);
    }
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.stroke(255, 150);
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
      v.update();
      v.show();
    }
  }

};

var myp5 = new p5(s);