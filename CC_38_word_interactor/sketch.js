// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AKuW48WeNMA

// instance mode by Naoto Hieda


var textfield;
var output;
var submit;


var s = function (sketch) {
  sketch.setup = function () {
    console.log(this);
    sketch.noCanvas();
    textfield = sketch.select("#input");
    output = sketch.select('#output');
    submit = sketch.select("#submit");
    submit.mousePressed(newText);
  }

  function highlight() {
    console.log(this.html());
    this.html('rainbow');
    var c = sketch.color(sketch.random(255), sketch.random(255), sketch.random(255));
    this.style('background-color', c);
    //var s = this.html().replace(

    //console.log(this);
    //console.log('hover');
  }

  function newText() {
    var s = textfield.value();

    var words = s.split(/(\W+)/);
    console.log(words);
    for (var i = 0; i < words.length; i++) {

      var span = sketch.createSpan(words[i]);
      span.parent(output);

      if (!/\W+/.test(words[i])) {
        //span.style('background-color', color(random(255), 0, random(255)));
        span.mouseOver(highlight);
      }
    }
    //console.log(words);
  }

};

var myp5 = new p5(s);
