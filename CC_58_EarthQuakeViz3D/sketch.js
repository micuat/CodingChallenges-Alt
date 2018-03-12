// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: [coming soon]

// instance mode by Naoto Hieda

var angle = 0;

var table;
var r = 200;

var earth;
var globe;


var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(600, 600);
    earth = sketch.loadImage("../CC_58_EarthQuakeViz3D/data/earth.jpg");
    // table = loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv", "header");
    table = sketch.loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "header");

    sketch.noStroke();
    globe = sketch.createShape(sketch.SPHERE, r);
    globe.setTexture(earth);
  }

  sketch.draw = function () {
    sketch.background(51);
    sketch.translate(sketch.width * 0.5, sketch.height * 0.5);
    sketch.rotateY(angle);
    angle += 0.05;

    sketch.lights();
    sketch.fill(200);
    sketch.noStroke();
    // sketch.sphere(r);
    sketch.shape(globe);

    for (let i = 0; i < table.getRowCount(); i++) {
      let row = table.getRow(i);
      let lat = row.getFloat("latitude");
      let lon = row.getFloat("longitude");
      let mag = row.getFloat("mag");
      let theta = sketch.radians(lat) + sketch.PI / 2;
      let phi = sketch.radians(lon) + sketch.PI;
      let x = r * sketch.sin(theta) * sketch.cos(phi);
      let y = -r * sketch.sin(theta) * sketch.sin(phi);
      let z = r * sketch.cos(theta);
      let pos = sketch.createVector(x, y, z);

      let h = sketch.pow(10, mag);
      let maxh = sketch.pow(10, 7);
      h = sketch.map(h, 0, maxh, 10, 100);
      let xaxis = sketch.createVector(1, 0, 0);
      let angleb = p5.Vector.angleBetween(xaxis, pos);
      let raxis = xaxis.cross(pos);



      sketch.pushMatrix();
      sketch.translate(x, y, z);
      sketch.rotate(angleb, raxis.x, raxis.y, raxis.z);
      sketch.fill(255);
      sketch.box(h, 5, 5);
      sketch.popMatrix();
    }
  }

};

var myp5 = new p5(s);