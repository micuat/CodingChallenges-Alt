// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/u-HUtrpyi1c

// instance mode by Naoto Hieda

function diastic(seed, words) {

  var phrase = "";
  var currentWord = 0;

  for (var i = 0; i < seed.length; i++) {
    var c = seed.charAt(i);

    for (var j = currentWord; j < words.length; j++) {
      if (words[j].charAt(i) == c) {
        phrase += words[j];
        phrase += " ";
        currentWord = j + 1;
        //console.log(words[j]);
        break;
      }
    }
  }
  return phrase;
}

var srctxt;
var words;

var s = function (sketch) {
  sketch.preload = function () {
    srctxt = sketch.loadStrings('rainbow.txt');
  }


  sketch.setup = function () {
    sketch.noCanvas();
    srctxt = sketch.join(srctxt, ' ');
    words = sketch.splitTokens(srctxt, ' ,!.?');

    var seed = sketch.select("#seed");
    var submit = sketch.select("#submit");
    submit.mousePressed(function () {
      var phrase = diastic(seed.value(), words);
      sketch.createP(phrase);
      // createP(seed.value());
      // createP(srctxt);
    });

  }

};

var myp5 = new p5(s);
