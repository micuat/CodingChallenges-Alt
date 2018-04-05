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

if(true || contents == undefined) {
  var contents = [];
  var titles = [];
  var points = [];
}

var vehicles = [];

var fontl, fontm, fontp;

var s = function (p) {

  p.setup = function () {
    fontl = new Packages.geomerative.RFont(p.sketchPath("../CC_Alt_66_timer/HelveticaNeueUltraLight.ttf"), 100, p.CENTER);
    fontm = new Packages.geomerative.RFont(p.sketchPath("../CC_Alt_66_timer/HelveticaNeueUltraLight.ttf"), 30, p.LEFT);
    fontp = p.createFont("../CC_Alt_66_timer/HelveticaNeueUltraLight", 30);
    Packages.geomerative.RCommand.setSegmentLength(4); // 5 = many points; 125 = only a few points
    Packages.geomerative.RCommand.setSegmentator(Packages.geomerative.RCommand.UNIFORMLENGTH);
    p.createCanvas(800, 800);
    if(contents.length == 0) {
      titles = [];
      groups = [];
      startSearch();
    }

    for(let i = contents.length-1; i >= 0; i--) {
      if(contents[i] === undefined) {
        contents.splice(i, 1);
        titles.splice(i, 1);
        points.splice(i, 1);
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
          points.splice(i, 1);
        }
      }
    }
    let numPoints = 0;
    for(let i in points) {
      if(numPoints < points[i].length) {
        numPoints = points[i].length;
      }
    }
    vehicles = [];
    for(let i = 0; i < numPoints; i++) {
      let p0 = p.random(points[0]);
      let p1 = p.random(points[1]);
      vehicles.push(new Vehicle(p, p0.x, p0.y, p1.x, p1.y));
    }

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
      let titleOrg = title;
      title = title.replace(/\s+/g, '_');
      console.log(title)
      titles.push(titleOrg);

      let grp = fontl.toGroup(titleOrg);
      let rpoints = grp.getPoints();
      points.push([]);
      for (var i = 0; i < rpoints.length; i++) {
        points[points.length - 1].push({x: rpoints[i].x, y: rpoints[i].y});
      }

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
    let index = p.floor(p.frameCount / 60) % contents.length;
    if(p.frameCount % 60 == 0) {
      for(let i = 0; i < vehicles.length; i++) {
        let p0 = p.random(points[index]);
        vehicles[i].target.x = p0.x;
        vehicles[i].target.y = p0.y;
      }
    }
    p.background(0);
    p.fill(255);
    p.textSize(20);
    p.textFont(fontp);
    let str = contents[index] + "";
    str = str.replace(/^[^a-zA-Z](.*)/g, '');
    str = str.replace(/\n[^a-zA-Z](.*)/g, '');
    str = str.replace(/{{(.*)}}/g, '');
    str = str.replace(/<(.*)>/g, '');
    p.push();
    p.translate(p.width / 2, p.height / 2);
    // fontl.toGroup(titles[index]).draw();

    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
      v.update();
      v.show();
    }
    p.pop();

    p.fill(255, 100);
    p.translate(50, 20);
    // groups[index].draw();
    p.text(str, 0, 0, 700, 700)
  }
};

var myp5 = new p5(s);
