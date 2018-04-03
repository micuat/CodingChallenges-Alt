// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Acrostic
// Video: https://youtu.be/jwoK5WKVXGw

// instance mode by Naoto Hieda

var url1 = "http://api.wordnik.com:80/v4/words.json/search/";
var url2 = "?caseSensitive=true&minCorpusCount=1&maxCorpusCount=25&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=-1&skip=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

if (acro === undefined) {
  var acro = [];
}

var fontc, fontl;
var curLine = 0;
var curPos = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);

    fontc = new Packages.geomerative.RFont(p.sketchPath("../CC_Alt_66_timer/HelveticaNeueMedium.ttf"), 50, p.CENTER);
    fontl = new Packages.geomerative.RFont(p.sketchPath("../CC_Alt_66_timer/HelveticaNeueMedium.ttf"), 50, p.LEFT);
    Packages.geomerative.RCommand.setSegmentLength(5); // 5 = many points; 125 = only a few points 
    Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);

    function pickWord(letter) {
      let url = url1 + letter + url2;
      let data = p.loadJSONObject(url);
      let options = data.getJSONArray('searchResults');
      // let selection = p.random(options);
      let selection = options.getJSONObject(0);
      return selection.getString('word');
    }

    function makeAcrostic(word) {
      for (let i = 0; i < word.length; i++) {
        let letter = word.charAt(i);
        let a = pickWord(letter);
        acro.push(a);
        console.log(a);
      }
    }

    if (acro.length == 0)
      makeAcrostic('rainbow');
  }

  p.draw = function () {
    p.background(0);
    p.noStroke();
    let gotoNext = false;
    for (let i in acro) {
      p.push();
      p.translate(150, i * 100 + 100);

      let a = acro[i];

      p.colorMode(p.HSB, 255);
      p.fill(i * 255 / acro.length, 255, 255);
      let cap = a.charAt(0).toUpperCase();
      let grp = fontc.toGroup(cap);
      grp.draw();

      p.fill(255);
      p.translate(30, 0);
      let pos;
      let suffix = '';
      if(i == curLine) {
        if(p.frameCount % 3 == 0) {
          curPos++;
        }
        pos = curPos;
        suffix = '_';
        if(pos >= a.length-1) {
          curPos = 0;
          gotoNext = true;
        }
      }
      else if(i < curLine) {
        pos = a.length;
      }
      else if(i > curLine) {
        pos = 0;
      }
      grp = fontl.toGroup(a.slice(1, p.floor(pos)) + suffix);
      grp.draw();

      p.pop();
    }
    if(gotoNext) curLine = (curLine + 1) % acro.length;
  }
};

var myp5 = new p5(s);
