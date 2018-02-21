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

  var button;

  sketch.setup = function () {
    sketch.noCanvas();
    button = sketch.createButton('generate');
    button.mousePressed(sketch.cfg);
  }

  sketch.cfg = function () {
    var start = "S";
    var expansion = [];
    var result = sketch.expand(start, expansion);
    console.log(result);
    sketch.createP(result);
  }

};

var myp5 = new p5(s);
