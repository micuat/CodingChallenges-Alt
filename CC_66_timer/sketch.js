// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Timer
// https://youtu.be/MLtAMg9_Svw

// instance mode by Naoto Hieda

var timeleft = 10;

var startTime = 0;
var currentTime = 0;


var s = function (sketch) {

  sketch.convertSeconds = function (s) {
    var min = sketch.floor(s / 60);
    var sec = s % 60;
    return sketch.nf(min, 2) + ':' + sketch.nf(sec, 2);
  }

  var ding;

  sketch.preload = function () {
    ding = sketch.loadSound("ding.mp3");
  }

  sketch.setup = function () {
    sketch.noCanvas();
    startTime = sketch.millis();


    var params = sketch.getURLParams();
    console.log(params);
    if (params.minute) {
      var min = params.minute;
      timeleft = min * 60;
    }

    var timer = sketch.select('#timer');
    timer.html(sketch.convertSeconds(timeleft - currentTime));

    var interval = setInterval(timeIt, 1000);

    function timeIt() {
      currentTime = sketch.floor((sketch.millis() - startTime) / 1000);
      timer.html(sketch.convertSeconds(timeleft - currentTime));
      if (currentTime == timeleft) {
        ding.play();
        clearInterval(interval);
        //counter = 0;
      }
    }

  }

};

var myp5 = new p5(s);
