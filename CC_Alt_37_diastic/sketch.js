// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/u-HUtrpyi1c

// instance mode by Naoto Hieda

function diastic(seed, words) {

  var phrase = "";
  var currentWord = 0;
  var nextWord = "";
  var curCount = 0;

  for (var i = 0; i < seed.length; i++) {
    var c = seed.charAt(i);

    for (var j = currentWord; j < words.length; j++) {
      if (words[j].charAt(i) == c) {
        if(phrase != "" && nextWord == "") {
          nextWord = words[j];
        }
        phrase += words[j];
        phrase += " ";
        curCount += words[j].length + 1;
        if(curCount > 20) {
          phrase += "\n";
          curCount = 0;
        }
        currentWord = j + 1;
        //console.log(words[j]);
        break;
      }
    }
  }
  return {phrase: phrase, next: nextWord};
}

var srctxt;
var words;
var phrase = "";
var next = "rainbow";
var font;

var s = function (sketch) {
  sketch.preload = function () {
    // srctxt = sketch.loadStrings('rainbow.txt');
    // font = sketch.loadFont('Lato-Hairline.ttf');
  }


  sketch.setup = function () {
    srctxt = sketch.loadStrings('../CC_Alt_37_diastic/rainbow.txt');
    font = sketch.createFont('../CC_Alt_37_diastic/Lato-Hairline.ttf', 60);
    // sketch.noCanvas();
    sketch.createCanvas(800, 800);
    srctxt = sketch.join(srctxt, ' ');
    words = sketch.splitTokens(srctxt, ' ,!.?');

    // var seed = sketch.select("#seed");
    // var submit = sketch.select("#submit");
    // submit.mousePressed(function () {
    //   phrase = diastic(seed.value(), words);
    //   sketch.createP(phrase);
    //   // createP(seed.value());
    //   // createP(srctxt);
    // });

  }

  sketch.draw = function () {
    if(sketch.frameCount % 60 == 0) {
      // let word = next;
      let word = "";
      while(word.length < 4) {
        word = words[sketch.floor(sketch.random(words.length))];
      }
      ret = diastic(word, words);
      phrase = ret.phrase;
      next = ret.next;
    }
    sketch.background(0);
    sketch.fill(255);
    sketch.noStroke();
    sketch.textFont(font);
    sketch.textSize(60);
    sketch.text(phrase, 20, 200);
    // sketch.text(next, 0, sketch.height/2+30);
  }
};

var myp5 = new p5(s);
