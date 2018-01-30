// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RkuBWEkBrZA

// instance mode by Naoto Hieda

var s = function (sketch) {

  var cam;
  var globe = [];
  var normals = [];
  var totali = 150;
  var totalj = 75;
  var offset = 0;

  var m = 0;
  var mchange = [];
  
  var a = 1;
  var b = 1;

  sketch.supershape = function (theta, m, n1, n2, n3) {
    var t1 = sketch.abs((1/a)*sketch.cos(m * theta / 4));
    t1 = sketch.pow(t1, n2);
    var t2 = sketch.abs((1/b)*sketch.sin(m * theta/4));
    t2 = sketch.pow(t2, n3);
    var t3 = t1 + t2;
    var r = sketch.pow(t3, - 1 / n1);
    return r;
  }
  
  sketch.setup = function () {
    if(sketch.isLiveJs) {
      cam = new Packages.peasy.PeasyCam(pApplet.that, 500);
      sketch.createCanvas(800, 800);
    }
    else {
      sketch.createCanvas(800, 800, sketch.WEBGL);
    }
    sketch.colorMode(sketch.RGB);
    sketch.blendMode(sketch.BLEND);
  }

  sketch.draw = function () {
    // m = sketch.map(sketch.sin(mchange), -1, 1, 0, 3);
    // let mm = sketch.pow(2, m);
    // mchange += 0.02;
  
    sketch.background(0);
    sketch.noStroke();
    sketch.lights();
    let r = 300;
    for (let i = 0; i < totali+1; i++) {
      if(mchange[i] == null) mchange[i] = 0.05 * i;
      m = sketch.map(sketch.sin(mchange[i]), -1, 1, 0, 6);
      let mm = m;//sketch.pow(2, m);
      mchange[i] += 0.02;
      let lat = sketch.map(i, 0, totali, -sketch.HALF_PI, sketch.HALF_PI);
      let r2 = sketch.supershape(lat, mm, 0.2, 1.7, 1.7);
      globe[i] = [];
      normals[i] = [];
      for (let j = 0; j < totalj+1; j++) {
        let lon = sketch.map(j, 0, totalj, -sketch.PI, sketch.PI);
        let r1 = sketch.supershape(lon, mm, 0.2, 1.7, 1.7);
        let x = r * r1 * sketch.cos(lon) * r2 * sketch.cos(lat);
        let y = r * r1 * sketch.sin(lon) * r2 * sketch.cos(lat);
        let z = r * r2 * sketch.sin(lat);
        globe[i][j] = new p5.Vector(x, y, z);
      }
    }
    // for (let i = 0; i < total+1; i++) {
    //   for (let j = 0; j < total+1; j++) {
    //     let lon = sketch.map(j, 0, total, -sketch.PI, sketch.PI);
    //     let x = -sketch.sin(lon);
    //     let z = sketch.cos(lon);
    //     let y = 0;
    //     normals[i][j] = new p5.Vector(x, y, z);
    //     normals[i][j].normalize();
    //   }
    // }
  
    offset += 5;
    for (let i = 0; i < totali; i++) {
      // let hu = sketch.map(i, 0, total, 0, 255*6);
      // sketch.fill((hu + offset) % 127);
      sketch.fill(255);
      sketch.beginShape(sketch.TRIANGLE_STRIP);
      for (let j = 0; j < totalj+1; j++) {
        let v1 = globe[i][j];
        let n1 = normals[i][j];
        sketch.vertex(v1.x, v1.y, v1.z);
        // sketch.normal(n1.x, n1.y, n1.z);
        let v2 = globe[i+1][j];
        let n2 = normals[i+1][j];
        sketch.vertex(v2.x, v2.y, v2.z);
        // sketch.normal(n2.x, n2.y, n2.z);
      }
      sketch.endShape();
    }
  }

};

var myp5 = new p5(s);
