// Daniel Shiffman
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc

// instance mode by Naoto Hieda

var mapimg;

var clat = 0;
var clon = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

var s = function (sketch) {
  sketch.preload = function () {
    // The clon and clat in this url are edited to be in the correct order.
    mapimg = sketch.loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' +
      clon + ',' + clat + ',' + zoom + '/' +
      ww + 'x' + hh +
      '?access_token=pk.eyJ1IjoiY29kaW5ndHJhaW4iLCJhIjoiY2l6MGl4bXhsMDRpNzJxcDh0a2NhNDExbCJ9.awIfnl6ngyHoB3Xztkzarw', 'png');
    // earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
    earthquakes = sketch.loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
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
    sketch.createCanvas(ww, hh);
    sketch.translate(sketch.width / 2, sketch.height / 2);
    sketch.imageMode(sketch.CENTER);
    sketch.image(mapimg, 0, 0);

    var cx = sketch.mercX(clon);
    var cy = sketch.mercY(clat);

    for (var i = 1; i < earthquakes.length; i++) {
      var data = earthquakes[i].split(/,/);
      //console.log(data);
      var lat = data[1];
      var lon = data[2];
      var mag = data[4];
      var x = sketch.mercX(lon) - cx;
      var y = sketch.mercY(lat) - cy;
      // This addition fixes the case where the longitude is non-zero and
      // points can go off the screen.
      if (x < - sketch.width / 2) {
        x += sketch.width;
      } else if (x > sketch.width / 2) {
        x -= sketch.width;
      }
      mag = sketch.pow(10, mag);
      mag = sketch.sqrt(mag);
      var magmax = sketch.sqrt(sketch.pow(10, 10));
      var d = sketch.map(mag, 0, magmax, 0, 180);
      sketch.stroke(255, 0, 255);
      sketch.fill(255, 0, 255, 200);
      sketch.ellipse(x, y, d, d);
    }

  }

};

var myp5 = new p5(s);
