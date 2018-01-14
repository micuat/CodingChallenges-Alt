// instance mode by Naoto Hieda

var x = 0.02;
var y = 0;
var z = 0;

var a = 10;
var b = 28;
var c = 8.0 / 3.0;

var points = new Array();


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 600, sketch.WEBGL);
    sketch.colorMode(sketch.RGB);
  }

  sketch.draw = function () {
    sketch.background(0);

    for (var it = 0; it < 20; it++) {
      var dt = 0.001;
      var dx = (a * (y - x)) * dt;
      var dy = (x * (b - z) - y) * dt;
      var dz = (x * y - c * z) * dt;
      x = x + dx;
      y = y + dy;
      z = z + dz;

      var vel = dx * dx + dy * dy + dz * dz;
      vel = Math.sqrt(vel) * 10;

      for (var i = 0; i < 5; i++) {
        var x1 = x + sketch.randomGaussian() * 0.1 * vel;
        var y1 = y + sketch.randomGaussian() * 0.1 * vel;
        var z1 = z + sketch.randomGaussian() * 0.1 * vel;
        points.push(new p5.Vector(x1, y1, z1));
      }

      if(points.length > 10000) {
        for (var i = 0; i < 5; i++) {
          points.shift();
        }
      }
    } 

    sketch.translate(0, 0, -80);
    var camX = 0;//sketch.map(sketch.mouseX, 0, sketch.width, -200, 200);
    var camY = 0;//sketch.map(sketch.mouseY, 0, sketch.height, -200, 200);
    sketch.camera(camX, camY, (sketch.height / 2.0) / sketch.tan(sketch.PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    //translate(width/2, height/2);
    sketch.scale(5);
    sketch.stroke(255, 100);
    sketch.strokeWeight(0.2);
    sketch.noFill();

    var hu = 0;
    sketch.beginShape(sketch.POINTS);

    for (var i in points) {
      var v = points[i];
      // sketch.stroke(hu, 255, 255);
      sketch.vertex(v.x, v.y, v.z);
      //PVector offset = PVector.random3D();
      //offset.mult(0.1);
      //v.add(offset);

      hu += 1;
      if (hu > 255) {
        hu = 0;
      }
    }
    sketch.endShape();

    sketch.noStroke();
    sketch.fill(255);
    sketch.translate(v.x, v.y, v.z);
    sketch.sphere(0.2);


    //println(x,y,z);
  }

};

var myp5 = new p5(s);
