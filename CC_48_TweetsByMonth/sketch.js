// Obamathon
// https://github.com/ITPNYU/Obamathon
// YouTube video tutorial: https://youtu.be/UrznYJltZrU

// instance mode by Naoto Hieda

// All data
var potus;

// An object with a property for each month
var counts = {};

// List of words to ignore
// This is silly and a better strategy would be to load from a text files
// or use an algorithm like TF-IDF to pick out unique words
var ignore = {
  "the": 'true',
  "to": 'true',
  "we": 'true',
  "of": 'true',
  "and": 'true',
  "a": 'true',
  "http": 'true',
  "https": 'true',
  "our": 'true'
}


var s = function (sketch) {

  // Load the data
  sketch.preload = function () {
    potus = sketch.loadJSON('flotus.json');

  }


  sketch.setup = function () {
    if(sketch.isLiveJs) {
      let strings = sketch.loadStrings('../CC_48_TweetsByMonth/flotus.json');
      let json = "";
      for(let i in strings) {
        json += strings[i] + "\n";
      }
      potus = JSON.parse(json);
    }
    sketch.createCanvas(600, 400);
    var tweets = potus.tweets;
    // Look at every tweet
    for (var i = 0; i < tweets.length; i++) {
      var date = new Date(tweets[i].timestamp);
      // Determine month and year
      var month = date.getMonth();
      var year = date.getFullYear();
      var key = month + '/' + year;

      // Increase the count by 1 for each tweet
      if (counts.hasOwnProperty(key)) {
        counts[key].total++;
      } else {
        counts[key] = {
          total: 1,
          // Initialize an object to hold a words table for each month
          words: {}
        };
      }

      // Tweet text
      var txt = tweets[i].text;
      // Split up the words
      // The regex could be improved to deal with apostrophes and other
      // non word data.
      var words = txt.split(/\W+/);

      // Count each time a word appears
      for (var j = 0; j < words.length; j++) {
        var word = words[j].toLowerCase();
        if (word.length > 0) {
          if (counts[key].words.hasOwnProperty(word)) {
            counts[key].words[word]++;
          } else {
            counts[key].words[word] = 1;
          }
        }
      }

    }
  }

  sketch.draw = function () {
    sketch.background(0);

    // Reverse the order
    var months = Object.keys(counts);
    months.reverse();

    // Normalize all the data by finding the maximum number
    var maxtweets = 0;
    for (var i = 0; i < months.length; i++) {
      var month = months[i];
      var num = counts[month].total;
      if (num > maxtweets) {
        maxtweets = num;
      }
    }
    var w = sketch.width / months.length;

    // Graph the data
    for (var i = 0; i < months.length; i++) {
      var month = months[i];
      var num = counts[month].total;
      // Height of bar is number of tweets
      var h = sketch.map(num, 0, maxtweets, 0, 300);
      sketch.fill(200);
      sketch.rect(i * w, sketch.height - h, w - 1, h);

      // Find the word with the largest counts
      // This could be improved.
      var wordCounts = counts[month].words;
      var words = Object.keys(wordCounts);
      var biggest = 0;
      var biggestWord = '';
      for (var j = 0; j < words.length; j++) {
        var word = words[j];
        if (wordCounts[word] > biggest && !ignore[word] && word.length > 3) {
          biggest = wordCounts[word];
          biggestWord = word;
        }
      }
      // Draw the word
      sketch.fill(255);
      sketch.text(biggestWord, i * w, sketch.height - h - 5);

    }

  }

};

var myp5 = new p5(s);
