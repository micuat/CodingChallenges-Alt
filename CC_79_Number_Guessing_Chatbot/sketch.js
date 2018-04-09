// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Number Guessing Chatbot
// Edited Video: https://www.youtube.com/watch?v=zGe1m_bLOFk

// instance mode by Naoto Hieda

var s = function (p) {

  p.setup = function () {
    p.noCanvas();

    let bot = new RiveScript();
    bot.loadFile("brain.rive", brainReady, brainError);

    function brainReady() {
      console.log('Chatbot ready!');
      bot.sortReplies();
      let num = p.floor(p.random(10)) + 1;
      console.log(num);
      let reply = bot.reply('local-user', 'set ' + num);
    }

    function brainError() {
      console.log('Chatbot error!')
    }


    let button = p.select('#submit');
    let user_input = p.select('#user_input');
    let output = p.select('#output');

    button.mousePressed(chat);

    function chat() {
      let input = user_input.value();
      let reply = bot.reply("local-user", input);
      output.html(reply);
    }

  }

};

var myp5 = new p5(s);
