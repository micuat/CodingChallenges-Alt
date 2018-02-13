// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RPMYV-eb6ll

// instance mode by Naoto Hieda

var txt = [];
var counts = {};
var keys = [];
var allwords = [];
var font;

var files = ['rainbow.txt', 'sports.txt', 'eclipse.txt', 'fish.txt'];

var words = [];

function Word(sketch, s) {
  this.s = s;
  this.target = null;
  this.origin = s;
  this.deleting = false;
  this.adding = false;
  this.done = false;
  this.isSpace = s.match(/[a-zA-Z]/) == null;
  this.color = sketch.random(255);
  this.justDecided = 0;
  this.toggle = false;
  this.timing = sketch.random(1);

  this.get = function () {
    return this.s;
  }
  this.update = function () {
  }
  this.draw = function (x, y, h) {
    if (this.isSpace) return;
    sketch.colorMode(sketch.RGB);
    let t = sketch.frameCount / this.color / 2 + this.timing;
    let tw = sketch.textWidth(this.s);
    if ((t) % 2 < 1) {
      if ((t) % 1 > 0.5) {

        if (this.toggle == false) {
          this.justDecided = 1;//sketch.random(1);
          this.toggle = true;
        }
      }
      else {
        sketch.noStroke();
        sketch.fill(255, 255 - this.color * 10);
        sketch.rect(x, y - h + 7, tw * this.justDecided, h);
        this.toggle = false;
      }
      sketch.noStroke();
      sketch.fill(255, 255);
      sketch.text(this.s, x, y);
    }
    else {
      sketch.stroke(255, 255 - this.color * 2);
      for(let i = 0; i < tw - 1; i++) {
        let y0 = sketch.sin(t + i / this.color * 5) * 10;
        let y1 = sketch.sin(t + (i + 1) / this.color * 5) * 10;
        sketch.line(x + i, y - 10 + y0, x + i + 1, y - 10 + y1);
      }
    }
  }
}

var s = function (sketch) {
  sketch.preload = function () {
  }

  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    font = sketch.createFont('../CC_Alt_37_diastic/Lato-Hairline.ttf', 60);

    for (var i = 0; i < files.length; i++) {
      let t = sketch.loadStrings('../CC_Alt_40_3_tf-idf/files/' + files[i]);
      txt[i] = [];
      for (let j in t) {
        txt[i][j] = t[j] + "";
      }
    }
    for (var i = 0; i < txt.length; i++) {
      allwords[i] = txt[i].join("\n");
    }

    var tokens = allwords[0].split(/\W+/);
    for (var i = 0; i < tokens.length; i++) {
      var word = tokens[i].toLowerCase();
      if (counts[word] === undefined) {
        counts[word] = {
          tf: 1,
          df: 1
        };
        keys.push(word);
      } else {
        counts[word].tf = counts[word].tf + 1;
      }
    }

    var othercounts = [];
    for (var j = 1; j < allwords.length; j++) {
      var tempcounts = {};
      var tokens = allwords[j].split(/\W+/);
      for (var k = 0; k < tokens.length; k++) {
        var w = tokens[k].toLowerCase();
        if (tempcounts[w] === undefined) {
          tempcounts[w] = true;
        }
      }
      othercounts.push(tempcounts);
    }



    for (var i = 0; i < keys.length; i++) {
      var word = keys[i];
      for (var j = 0; j < othercounts.length; j++) {
        var tempcounts = othercounts[j];
        if (tempcounts[word]) {
          counts[word].df++;
        }
      }
    }

    for (var i = 0; i < keys.length; i++) {
      var word = keys[i];
      var wordobj = counts[word];
      wordobj.tfidf = wordobj.tf * sketch.log(files.length / wordobj.df);
    }


    keys.sort(compare);

    function compare(a, b) {
      var countA = counts[a].tfidf;
      var countB = counts[b].tfidf;
      return countB - countA;
    }

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // sketch.createDiv(key + " " + counts[key].tfidf);
      console.log(key + " " + counts[key].tfidf);
    }

    // sketch.noCanvas();

    let swords = allwords[0].split(/(\W+)/);
    for (let i in swords) {
      let index = keys.indexOf(swords[i]);
      words[i] = new Word(sketch, swords[i]);
      if (index > 0)
        words[i].color = sketch.map(counts[keys[index]].tfidf, 0, 7, 5, 30);
    }
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.fill(255);
    sketch.noStroke();
    sketch.textFont(font);

    sketch.background(0);
    sketch.fill(255);

    sketch.textSize(32);
    let maxLength = 600;
    let j = 0;
    let w = 0;
    for (let i in words) {
      words[i].update();
      let word = words[i].get();
      let ww = sketch.textWidth(word);
      if (w + ww > maxLength && !word.match(/[^a-zA-Z]+/)) {
        j++;
        w = 0;
      }
      words[i].draw(100 + w, 100 + 34 * j, 33);
      w += ww;
    }
  }

};

var myp5 = new p5(s);
