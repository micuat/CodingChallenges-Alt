// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/8Z9FRiW2Jlc

// instance mode by Naoto Hieda

var rules = {
  "S": [
    ["NP", "VP"],
    ["Interj", "NP", "VP"]
  ],
  "NP": [
    ["Det", "N"],
    ["Det", "N", "that", "VP"],
    ["Det", "Adj", "N"]
  ],
  "VP": [
    ["Vtrans", "NP"],
    ["Vintr"]
  ],
  "Interj": [
    ["oh"],
    ["my"],
    ["wow"],
    ["darn"]
  ],
  "Det": [
    ["this"],
    ["that"],
    ["the"]
  ],
  "N": [
    ["amoeba"],
    ["dichotomy"],
    ["seagull"],
    ["trombone"],
    ["overstaffed"],
    ["corsage"]
  ],
  "Adj": [
    ["bald"],
    ["smug"],
    ["important"],
    ["tame"],
    ["overstaffed"],
    ["corsage"]
  ],
  "Vtrans": [
    ["computes"],
    ["examines"],
    ["foregrounds"],
  ],
  "Vintr": [
    ["coughs"],
    ["daydreams"],
    ["whines"],
  ]
};
// var rules = {
//   "S": [
//     ["The", "N", "V"]
//   ],
//   "N": [
//     ["cat"],
//     ["dog"]
//   ],
//   "V": [
//     ["meows"],
//     ["barks"]
//   ]
// };
var result = "";
var font;
var cur = "";

var s = function (sketch) {

  sketch.expand = function (start, expansion) {
    if (rules[start]) {
      var pick = sketch.random(rules[start]);
      console.log(pick);
      for (var i = 0; i < pick.length; i++) {
        sketch.expand(pick[i], expansion);
      }
    } else {
      expansion.push(start);
    }
    return expansion.join(" ");
  }

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    font = sketch.createFont('../CC_Alt_37_diastic/Lato-Hairline.ttf', 60);
  }

  sketch.draw = function () {
    if (cur.length >= result.length || result == "") {
      sketch.cfg();
      cur = "";
    }
    else if (cur.length < result.length && sketch.frameCount % 2) {
      cur += result[cur.length];
    }

    sketch.background(0);
    sketch.textFont(font);
    sketch.textSize(60);
    sketch.text(cur + '_', 20, 100, 700, 500);
  }

  sketch.cfg = function () {
    var start = "S";
    var expansion = [];
    result = sketch.expand(start, expansion);
    console.log(result);
  }

};

var myp5 = new p5(s);
