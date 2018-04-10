// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Number Guessing Chatbot
// Edited Video: https://www.youtube.com/watch?v=zGe1m_bLOFk

// instance mode by Naoto Hieda

var rules = {
  "S": [
    ["NP", "VP"],
    ["Interj", "NP", "VP"],
    ["Modal", "NP", "VPindi", "Q"],
    ["is", "NP"]
  ],
  "NP": [
    ["Det", "N"],
    ["Det", "N", "that", "VP"],
    ["Det", "Adj", "N"],
    ["everyone"]
  ],
  "VP": [
    ["Vtrans", "NP"],
    ["Vintr"]
  ],
  "VPindi": [
    ["Vtransindi", "NP"],
    ["Vintrindi"]
  ],
  "Interj": [
    ["oh"],
    ["my"],
    ["if"]
  ],
  "Modal": [
    ["can"],
    ["will"]
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
  "Vtransindi": [
    ["compute"],
    ["examine"],
    ["foreground"],
  ],
  "Vintr": [
    ["coughs"],
    ["daydreams"],
    ["whines"],
  ],
  "Vintrindi": [
    ["cough"],
    ["daydream"],
    ["whine"],
  ],
  "Q": [
    ["?"]
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
var bot;
var output = "";
var typeBuf = "";
var lastFrame = 0;

var s = function (p) {

  p.expand = function (start, expansion) {
    if (rules[start]) {
      var pick = p.random(rules[start]);
      console.log(pick);
      for (var i = 0; i < pick.length; i++) {
        p.expand(pick[i], expansion);
      }
    } else {
      expansion.push(start);
    }
    return expansion.join(" ");
  }

  p.cfg = function () {
    var start = "S";
    var expansion = [];
    result = p.expand(start, expansion);
    result = result.charAt(0).toUpperCase() + result.slice(1);
    console.log(result);
  }

  p.setup = function () {
    p.createCanvas(800, 800);
    font = p.createFont('../CC_Alt_37_diastic/Lato-Hairline.ttf', 48);

    bot = new RiveScript();
    if (p.isLiveJs) {
      try {
        let lines = p.loadStrings("../CC_Alt_79_Number_Guessing_Chatbot/brain.rive");
        let l = "";
        for (let i in lines) { l += lines[i] + "\n" }
        bot.stream(l);
        brainReady();
      } catch (e) {
        print(e)
      }
    }
    else {
      bot.loadFile("brain.rive", brainReady, brainError);
    }

    function brainReady() {
      console.log('Chatbot ready!');
      bot.sortReplies();
      // let num = p.floor(p.random(10)) + 1;
      // console.log(num);
      // let reply = bot.reply('local-user', 'set ' + num);
    }

    function brainError() {
      console.log('Chatbot error!')
    }
  }
  p.draw = function () {
    p.background(0);
    p.fill(255);
    // p.text(typeBuf, 100, 80);
    // p.text(output, 100, 100);

    if (p.frameCount - lastFrame < 30) {

    }
    else if (p.frameCount - lastFrame == 30) {
      cur = "";
    }
    else if (cur.length >= result.length || result == "") {
      let reply = bot.reply("local-user", cur);
      output = reply;
      console.log(output);

      lastFrame = p.frameCount;

      p.cfg();
    }
    else if (cur.length < result.length && p.frameCount % 2) {
      cur += result[cur.length];
    }

    p.background(0);
    p.textFont(font);
    p.textSize(48);
    p.text('> ' + cur + '_', 20, 100, 700, 500);
    p.text(output, 20, 500, 700, 500);
  }
  p.keyPressed = function () {
    let input = p.key;

    if (input == '\n') {

      let reply = bot.reply("local-user", typeBuf);
      output = reply;
      console.log(output);

      typeBuf = "";
    }
    else if (p.keyCode == java.awt.event.KeyEvent.VK_BACK_SPACE) {
      typeBuf = "";
    }
    else {
      typeBuf += input;
    }
  }

};

var myp5 = new p5(s);
