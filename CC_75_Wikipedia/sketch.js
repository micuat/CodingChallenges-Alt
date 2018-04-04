// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Wikipedia
// Edited Video: https://youtu.be/RPz75gcHj18

// instance mode by Naoto Hieda

let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
let contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

let userInput;

let counter = 0;

var s = function (p) {

  p.setup = function () {
    p.noCanvas();
    userInput = p.select('#userinput');
    userInput.changed(startSearch);
    console.log(userInput)
    //goWiki(userInput.value());

    function startSearch() {
      counter = 0;
      goWiki(userInput.value());
    }

    function goWiki(term) {
      counter = counter + 1;

      if (counter < 10) {
        //let term = userInput.value();
        let url = searchUrl + term;
        p.loadJSON(url, gotSearch, 'jsonp');
      }
    }

    function gotSearch(data) {
      console.log(data);
      let len = data[1].length;
      let index = p.floor(p.random(len));
      let title = data[1][index];
      title = title.replace(/\s+/g, '_');
      p.createDiv(title);
      console.log('Querying: ' + title);
      let url = contentUrl + title;
      p.loadJSON(url, gotContent, 'jsonp');
    }

    function gotContent(data) {
      let page = data.query.pages;
      let pageId = Object.keys(data.query.pages)[0];
      console.log(pageId);
      let content = page[pageId].revisions[0]['*'];
      console.log(content);
      let wordRegex = /\b\w{4,}\b/g;
      let words = content.match(wordRegex);
      let word = p.random(words);
      goWiki(word);
      console.log(word);
    }
  }

};

var myp5 = new p5(s);
