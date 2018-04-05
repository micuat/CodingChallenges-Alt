// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Wikipedia
// Edited Video: https://youtu.be/RPz75gcHj18

// instance mode by Naoto Hieda

var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
var contentUrl = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=';

var userInput;

var counter = 0;

if(contents == undefined) {
  var contents = [];
  var titles = [];
}

var font;

var s = function (p) {

  p.setup = function () {
    font = new Packages.geomerative.RFont(p.sketchPath("../CC_Alt_66_timer/HelveticaNeueUltraLight.ttf"), 50, p.LEFT);
    Packages.geomerative.RCommand.setSegmentLength(5); // 5 = many points; 125 = only a few points 
    Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);
    p.createCanvas(800, 800);
    if(contents.length == 0)
      startSearch();

    for(let i = contents.length-1; i >= 0; i--) {
      if(contents[i] === undefined) {
        contents.splice(i, 1);
        titles.splice(i, 1);
      }
      else {
        let str = contents[i] + "";
        str = str.replace(/^[^a-zA-Z](.*)/g, '');
        str = str.replace(/\n[^a-zA-Z](.*)/g, '');
        str = str.replace(/{{(.*)}}/g, '');
        str = str.replace(/<(.*)>/g, '');
        if(str == ""){
          contents.splice(i, 1);
          titles.splice(i, 1);
        }
      }
    }
    print(contents[1])

    function startSearch() {
      counter = 0;
      goWiki('rainbow');
    }

    function goWiki(term) {
      counter = counter + 1;

      if (counter < 10) {
        //let term = userInput.value();
        let url = searchUrl + term;
        gotSearch(p.loadJSONArray(url));
      }
    }

    function gotSearch(data) {
      // console.log(data);
      let len = data.getJSONArray(1).size();
      let index = p.floor(p.random(len));
      let title = data.getJSONArray(1).getString(index);
      title = title.replace(/\s+/g, '_');
      console.log(title)
      titles.push(title);
      // console.log('Querying: ' + title);
      let url = contentUrl + title;
      gotContent(p.loadJSONObject(url));
    }

    function gotContent(data) {
      let page = data.getJSONObject('query').getJSONObject('pages');
      let pageId = page.keys().toString().replace('[', '').replace(']', '')//page.keys()[0];
      // print(page.getJSONObject(pageId).getJSONArray('revisions').size())

      let content = page.getJSONObject(pageId).getJSONArray('revisions').getJSONObject(0).getString('*');
      contents.push(content);
      // console.log(content);
      let wordRegex = /\b\w{4,}\b/g;
      let words = content.match(wordRegex);
      let word = p.random(words);
      goWiki(word);
      // console.log(word);
    }
  }

  p.draw = function () {
    let index = p.floor(p.millis() * 0.001) % contents.length;
    p.background(0);
    p.fill(255);
    p.textSize(20);
    let str = contents[index] + "";
    str = str.replace(/^[^a-zA-Z](.*)/g, '');
    str = str.replace(/\n[^a-zA-Z](.*)/g, '');
    str = str.replace(/{{(.*)}}/g, '');
    str = str.replace(/<(.*)>/g, '');
    p.translate(50, 60);
    font.toGroup(titles[index]).draw();
    p.translate(0, 40);
    // font.toGroup(str).draw();
    p.text(str, 0, 0, 700, 700)
  }
};

var myp5 = new p5(s);
