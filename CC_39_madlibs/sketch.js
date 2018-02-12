// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ziBO-U2_t3k

// instance mode by Naoto Hieda

var data;

var txt = '$$Exclamation$$! they said $$Adverb$$ as they jumped into their $$Noun$$ and flew off with their $$Adjective$$ $$PluralNoun$$.';

var s = function (sketch) {
  sketch.setup = function () {
    sketch.noCanvas();
    Tabletop.init({
      key: '15WyEmfu6B1UCzzqeacYnzI8lutrxF6uWvFDiSteBqTs',
      callback: gotData,
      simpleSheet: true
    });

    var button = sketch.createButton('generate madlib');
    button.mousePressed(sketch.generate);
  }

  sketch.replacer = function (match, pos) {
    var entry = sketch.random(data);
    return entry[pos];
  }


  sketch.generate = function () {
    //console.log('generate');
    var madlib = txt.replace(/\$\$(.*?)\$\$/g, sketch.replacer);
    sketch.createP(madlib);
  }

  function gotData(stuff, tabletop) {
    data = stuff;
  }

};

var myp5 = new p5(s);
