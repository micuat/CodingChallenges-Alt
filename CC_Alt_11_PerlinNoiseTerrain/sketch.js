// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

// instance mode by Naoto Hieda

var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

var s = function (sketch) {

  sketch.setup = function () {
    sketch.createCanvas(800, 800, sketch.WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (var x = 0; x < cols; x++) {
      terrain[x] = [];
      for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
      }
    }
  }

  sketch.draw = function () {

    flying -= 0.01;
    var yoff = flying;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        if((sketch.frameCount/2 + y) % 60 < 5) {
          var p = 0.8;
          if((sketch.frameCount/2 + y) % 120 < 60)
            terrain[x][y] = terrain[x][y] * p + (1-p) * sketch.map(sketch.noise(xoff, yoff), 0, 1, -100, 100);
          else
            terrain[x][y] = terrain[x][y] * p + (1-p) * sketch.random(-30, 30);
            // terrain[x][y] = sketch.map(sketch.sin((x+y*0.1) * sketch.PI * 0.5), -1, 1, -20, 20);
        }
        else terrain[x][y] *= 0.8;
        // if((sketch.frameCount + y) % 60 < 60)
        // {
        //   var s = (sketch.frameCount + y) % 60 / 60;
        //   if(s < 0.5) s = 1 - s*2;
        //   else s = (s-0.5) * 2;
        //   terrain[x][y] *= s;
        // }
        xoff += 0.2;
      }
      yoff += 0.2;
    }


    sketch.background(0);
    // sketch.noStroke();
    sketch.stroke(255);
    //sketch.translate(0, 50, -100);
    sketch.translate(0, 0, 300);
    sketch.rotateX(-sketch.PI / 3);
    // sketch.fill(200, 200, 200, 50);
    // sketch.fill(255, 255);
    sketch.noFill();
    // sketch.directionalLight(255, 255, 255, 0, 0, -0.5);
    // sketch.pointLight(255, 255, 255, 0, 1000, 500);
    sketch.rotateY(sketch.millis() * 0.0003);
    // sketch.translate(-w / 2, -h / 2);
    for (var y = 0; y < rows - 1; y++) {
      sketch.beginShape();
      // sketch.beginShape(sketch.TRIANGLE_STRIP);
      for (var x = 0; x < cols+1; x++) {
        var r = scl * 10 + terrain[x%cols][y] * 0.85;
        var r2 = scl * 10 + terrain[(x+1)%cols][y] * 0.85;
        if(y == 0) r = scl * 10;
        var th = sketch.map(x, 0, cols, 0, 2 * sketch.PI);
        var th2 = sketch.map(x+1, 0, cols, 0, 2 * sketch.PI);
        var ph = sketch.map(y, 0, rows-1, sketch.PI, 0);
        sketch.curveVertex(sketch.cos(th) * sketch.sin(ph) * r, sketch.cos(ph) * scl * 10, sketch.sin(th) * sketch.sin(ph) * r);
        if(x == 0) 
        sketch.curveVertex(sketch.cos(th) * sketch.sin(ph) * r, sketch.cos(ph) * scl * 10, sketch.sin(th) * sketch.sin(ph) * r);
        if(x == cols)
        sketch.curveVertex(sketch.cos(th2) * sketch.sin(ph) * r2, sketch.cos(ph) * scl * 10, sketch.sin(th2) * sketch.sin(ph) * r2);
        // sketch.vertex(sketch.cos(th) * sketch.sin(ph) * r, sketch.cos(ph) * r, sketch.sin(th) * sketch.sin(ph) * r);
        r0 = r * 1.01;
        // sketch.line(sketch.cos(th) * sketch.sin(ph) * r, sketch.cos(ph) * r, sketch.sin(th) * sketch.sin(ph) * r, sketch.cos(th) * sketch.sin(ph) * r0, sketch.cos(ph) * r0, sketch.sin(th) * sketch.sin(ph) * r0);
        // sketch.line(sketch.cos(th) * sketch.sin(ph) * r, sketch.cos(ph) * r, sketch.sin(th) * sketch.sin(ph) * r, sketch.cos(th2) * sketch.sin(ph) * r2, sketch.cos(ph) * r2, sketch.sin(th2) * sketch.sin(ph) * r2);
        r = scl * 10 + terrain[x%cols][(y + 1) % rows] * 0.85;
        if(y == rows - 1) r = scl * 10;
        ph = sketch.map(y+1, 0, rows-1, sketch.PI, 0);
        // sketch.vertex(sketch.cos(th) * sketch.sin(ph) * r, sketch.cos(ph) * r, sketch.sin(th) * sketch.sin(ph) * r);
      }
      sketch.endShape();
    }
  }

};

var myp5 = new p5(s);
