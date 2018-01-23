// instance mode by Naoto Hieda

var s = function (sketch) {

  let x = 0.01;
  let y = 0;
  let z = 0;
  
  let a = 10;
  let b = 28;
  let c = 8.0 / 3.0;
  
  let points = new Array();
  
  sketch.setup = function () {
    sketch.createCanvas(800, 600, sketch.WEBGL);
    sketch.colorMode(sketch.HSB);
  }

  sketch.draw = function () {
    sketch.background(0);

    let dt = 0.01;
    let dx = (a * (y - x)) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;

    points.push(new p5.Vector(x, y, z));

    sketch.translate(0, 0, -80);
    let camX = sketch.map(sketch.mouseX, 0, sketch.width, -200, 200);
    let camY = sketch.map(sketch.mouseY, 0, sketch.height, -200, 200);
    sketch.camera(camX, camY, (sketch.height / 2.0) / sketch.tan(sketch.PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    //translate(width/2, height/2);
    sketch.scale(5);
    sketch.stroke(255);
    sketch.noFill();

    let hu = 0;
    sketch.beginShape();

    for (let i in points) {
      let v = points[i];
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
