// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/VV1JmMYceJw

// instance mode by Naoto Hieda

var afinn;


var s = function (sketch) {

  sketch.preload = function () {
    afinn = sketch.loadJSON('afinn111.json');
  }


  sketch.setup = function () {
    sketch.noCanvas();
    console.log(afinn);

    var txt = sketch.select('#txt');
    txt.input(typing);

    function typing() {
      var textinput = txt.value();
      var words = textinput.split(/\W/);
      console.log(words);
      var scoredwords = [];
      var totalScore = 0;
      for (var i = 0; i < words.length; i++) {
        var word = words[i].toLowerCase();
        if (afinn.hasOwnProperty(word)) {
          var score = afinn[word];
          console.log(word, score);
          totalScore += Number(score);
          scoredwords.push(word + ': ' + score + ' ');
        }
      }
      var scorePar = sketch.select('#scoreP');
      scorePar.html('score: ' + totalScore);
      var comp = sketch.select('#comparativeP');
      comp.html('comparative: ' + totalScore / words.length);
      var wordlist = sketch.select('#wordlistP');
      wordlist.html(scoredwords);

      //console.log(txt.value());
    }
  }





  sketch.draw = function () {

  }

};

var myp5 = new p5(s);
