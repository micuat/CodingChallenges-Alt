// instance mode by Naoto Hieda

var x = 0.01;
var y = 0;
var z = 0;

var a = 10;
var b = 28;
var c = 8.0 / 3.0;

var points = new Array();


var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 600, sketch.WEBGL);
    sketch.colorMode(sketch.HSB);
  }

  sketch.draw = function () {
    sketch.background(0);

    var dt = 0.01;
    var dx = (a * (y - x)) * dt;
    var dy = (x * (b - z) - y) * dt;
    var dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;

    points.push(new p5.Vector(x, y, z));

    sketch.translate(0, 0, -80);
    var camX = sketch.map(sketch.mouseX, 0, sketch.width, -200, 200);
    var camY = sketch.map(sketch.mouseY, 0, sketch.height, -200, 200);
    sketch.camera(camX, camY, (sketch.height / 2.0) / sketch.tan(sketch.PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    //translate(width/2, height/2);
    sketch.scale(5);
    sketch.stroke(255);
    sketch.noFill();

    var hu = 0;
    sketch.beginShape();

    for (var i in points) {
      var v = points[i];
      sketch.stroke(hu, 255, 255);
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


    //println(x,y,z);
  }

};

var myp5 = new p5(s);
