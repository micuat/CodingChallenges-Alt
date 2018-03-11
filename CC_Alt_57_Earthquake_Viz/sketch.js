// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc

// instance mode by Naoto Hieda
// var mapimg = undefined;
if(mapimg === undefined) {
  var mapimg;
  var earthquakes;
  var coords;
}

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;

var px = 0;

var s = function (sketch) {
  sketch.preload = function () {
    if(mapimg === undefined) {
        // The clon and clat in this url are edited to be in the correct order.
      mapimg = sketch.loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
        clon + ',' + clat + ',' + zoom + '/' +
        ww + 'x' + hh +
        '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw', 'png');
      // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
      let earthquakes_tmp = sketch.loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
      earthquakes = [];
      for(let i in earthquakes_tmp) {
        if(i != 0) earthquakes.push(earthquakes_tmp[i]);
      }

      coords = [];
      var cx = sketch.mercX(clon);
      var cy = sketch.mercY(clat);
  
      for (let i = 0 in earthquakes) {
        let data = earthquakes[i].split(/,/);
        //console.log(data);
        let epoch = new Date(data[0]).getTime();
        let lat = data[1];
        let lon = data[2];
        let mag = data[4];
        let x = sketch.mercX(lon) - cx;
        let y = sketch.mercY(lat) - cy;
        // This addition fixes the case where the longitude is non-zero and
        // points can go off the screen.
        if (x < - ww / 2) {
          x += ww;
        } else if (x > ww / 2) {
          x -= ww;
        }

        if (x > 0) x -= ww;
        mag = sketch.pow(10, mag);
        mag = sketch.sqrt(mag);
        let magmax = sketch.sqrt(sketch.pow(10, 10));
        let d = sketch.map(mag, 0, magmax, 0, 180);
        coords.push({x: x, y: y, d: d, t: -1000, epoch: epoch});
      }
    }
  }

  sketch.mercX = function (lon) {
    lon = sketch.radians(lon);
    var a = (256 / sketch.PI) * sketch.pow(2, zoom);
    var b = lon + sketch.PI;
    return a * b;
  }

  sketch.mercY = function (lat) {
    lat = sketch.radians(lat);
    var a = (256 / sketch.PI) * sketch.pow(2, zoom);
    var b = sketch.tan(sketch.PI / 4 + lat / 2);
    var c = sketch.PI - sketch.log(b);
    return a * c;
  }


  sketch.setup = function () {
    sketch.createCanvas(ww, ww);
  }

  var lastOffset = 0;
  sketch.draw = function () {
    let startEpoch = coords[0].epoch;
    let endEpoch = coords[coords.length - 1].epoch;
    let offsetEpoch = sketch.map(sketch.millis() * 0.001 % 1200, 0, 1200, startEpoch, endEpoch);
    let offset = 0;
    for (let i = 0; i < coords.length; i++) {
      if(coords[i].epoch < offsetEpoch) {
        offset = i;
        break;
      }
    }
    if(lastOffset != offset) {
      coords[offset].t = sketch.millis() * 0.001;
    }
    lastOffset = offset;

    sketch.background(0);
    px = sketch.lerp(px, coords[offset].x, 0.2);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.scale(2, 2);
    sketch.translate(-px, 0);
    sketch.imageMode(sketch.CENTER);
    sketch.tint(200);
    sketch.image(mapimg, 0, 0);
    sketch.image(mapimg, -ww, 0);
    sketch.image(mapimg, ww, 0);

    // sketch.noStroke();
    // sketch.fill(255, 100);
    sketch.stroke(255);
    sketch.strokeWeight(2);
    sketch.noFill();
    let t = sketch.millis() * 0.001;
    for (let i = 0; i < coords.length; i++) {
      let c = coords[i];
      if(t - c.t < 1) {
        let d = c.d;
        d += sketch.pow((1 - (t - c.t)), 2) * 100;
        sketch.ellipse(c.x, c.y, d);
      }
    }

  }

};

var myp5 = new p5(s);
