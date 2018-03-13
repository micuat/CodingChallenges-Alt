// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: [coming soon]

// instance mode by Naoto Hieda

var angle = Math.PI * 3/2;

// var table = undefined
if(table === undefined) {
  var table;
  var earth;
  var globe;
}
var r = 300;

var coords = [];

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    if(table === undefined) {
      sketch.noStroke();
      earth = sketch.loadImage("../CC_58_EarthQuakeViz3D/data/earth.jpg");
      // table = loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.csv", "header");
      table = sketch.loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv", "header");
      globe = sketch.createShape(sketch.SPHERE, r);
      globe.setTexture(earth);
    }

    coords = [];
    for (let i = 0; i < table.getRowCount(); i++) {
      let row = table.getRow(i);
      let lat = row.getFloat("latitude");
      let lon = row.getFloat("longitude");
      let mag = row.getFloat("mag");
      let phi = sketch.radians(lon) + sketch.PI;
      let theta = sketch.radians(lat);// sketch.PI / 2;
      let x = r * sketch.cos(theta) * sketch.cos(phi);
      let z = -r * sketch.cos(theta) * sketch.sin(phi);
      let y = -r * sketch.sin(theta);
      let pos = sketch.createVector(x, y, z);

      let h = sketch.pow(10, mag);
      let maxh = sketch.pow(10, 7);
      h = sketch.map(h, 0, maxh, 10, 100);
      let xaxis = sketch.createVector(1, 0, 0);
      let angleb = p5.Vector.angleBetween(xaxis, pos);
      let raxis = xaxis.cross(pos);

      let px = sketch.constrain(sketch.map(lon, -180, 180, 0, earth.width), 0, earth.width);
      let py = sketch.constrain(sketch.map(lat, 90, -90, 0, earth.height), 0, earth.height);
      let col = earth.get(px, py);
      col = sketch.color(255, 50, 50);
      coords.push({x: x, y: y, z: z,
        angleb: angleb,
        raxis: raxis,
        h: h,
        col: col,
        phi: phi,
        theta: theta});
    }
    for (let i = 0; i < 10000; i++) {
      let phi = sketch.random(0, sketch.TWO_PI);
      let theta = sketch.random(-sketch.PI, sketch.PI);
      let lon = sketch.degrees(phi - sketch.PI);
      let lat = sketch.degrees(theta);
      let mag = 1;
      let x = r * sketch.cos(theta) * sketch.cos(phi);
      let z = -r * sketch.cos(theta) * sketch.sin(phi);
      let y = -r * sketch.sin(theta);
      let pos = sketch.createVector(x, y, z);

      let h = 1;
      let xaxis = sketch.createVector(1, 0, 0);
      let angleb = p5.Vector.angleBetween(xaxis, pos);
      let raxis = xaxis.cross(pos);

      let px = sketch.constrain(sketch.map(lon, -180, 180, 0, earth.width), 0, earth.width);
      let py = sketch.constrain(sketch.map(lat, 90, -90, 0, earth.height), 0, earth.height);
      let col = earth.get(px, py);
      // if(sketch.blue(col) < 100) col = sketch.color(sketch.red(col), sketch.green(col), 100);
      // if(sketch.green(col) < 100) col = sketch.color(sketch.red(col), 100, sketch.blue(col));
      if(sketch.red(col) < 50) {i--; continue;};
      coords.push({x: x, y: y, z: z,
        angleb: angleb,
        raxis: raxis,
        h: h,
        col: col,
        phi: phi,
        theta: theta});
    }
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.translate(sketch.width * 0.5, sketch.height * 0.5);
    sketch.rotateY(angle);
    angle += 0.005;

    sketch.lights();
    sketch.fill(200);
    sketch.noStroke();
    // sketch.sphere(r);
    if(sketch.frameCount % 60 < 0)
      sketch.shape(globe);

    for(let i in coords) {
      let coord = coords[i];
      let angleb = coord.angleb;
      let raxis = coord.raxis;
      let h = coord.h;
      if(h > 1) {
        let dist = sketch.abs(coord.phi - (sketch.TWO_PI-((angle-sketch.PI*3/2) % sketch.TWO_PI)));
        if(dist < sketch.PI/4) {
          h = sketch.map(dist, 0, sketch.PI/4, h, 0);
        }
        else {
          continue;
        }
      }
      sketch.pushMatrix();
      sketch.translate(coord.x, coord.y, coord.z);
      sketch.rotate(angleb, raxis.x, raxis.y, raxis.z);
      sketch.fill(coord.col);
      sketch.translate(h/2, 0, 0);
      sketch.box(h, 5, 5);
      sketch.popMatrix();
    }
  }

};

var myp5 = new p5(s);