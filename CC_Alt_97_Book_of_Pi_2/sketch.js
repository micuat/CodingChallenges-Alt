// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Book of Pi 2
// https://youtu.be/4Ns9S-Z89-0


// instance mode by Naoto Hieda

var pi;
var pdf;

var s = function (p) {
  let charPerPage = 667;
  let page = 0;
  let cycle = 600;
  let firstFrame;
  let firstOne = true;

  p.renderBook = function () {
    if ((p.frameCount-firstFrame) % cycle == 0) {
      if(firstOne) {
        firstOne = false;
      }
      else {
        page++;
      }
    }
    let index = page * charPerPage;
    // let page = p.floor(index / charPerPage);
    //int cols = 10;
    //int rows = 10;

    //beginDraw();
    let w = p.textWidth("0");//float(width)/cols;
    let h = 14.1*2;//float(height)/rows;



    //int totalPages = pi.length() / (cols*rows);
    //println(totalPages);

    p.background(0);

    //for (int i = 0; i < totalPages; i++) {
    let marginx = 200;
    let marginy = 80;
    let pageNum = 0;

    p.fill(255);
    p.rect(marginx - 100, 0, p.width - marginx * 2 + 200, p.height);

    while (true) {
      for (let y = marginy; y < p.height - marginy; y += h) {
        //for (float x = 0; x < width; x += w) {
        let x = marginx;
        while (x < p.width - marginx - w / 2) {
          let i = index;
          let tween = (index % charPerPage) / charPerPage;
          let time = ((p.frameCount-firstFrame) % cycle) / cycle;
          // if (tween > time) {
          //   i = index + charPerPage;
          // }
          let s = "" + pi.charAt(i);
          // int digit = int(s);
          p.fill(0);
          p.textAlign(p.CENTER, p.CENTER);
          let dy = p.constrain(-(tween-time) * p.height * 1000, 0, p.height);
          dy *= (tween-time) * 10;
          p.fill(0, p.constrain(p.map(time - tween, 0, 0.01, 255, 0), 0, 255));
          p.text(s, x + w / 2, y + h / 2 + dy);

          if (tween < time) {
            i = index + charPerPage;
            s = "" + pi.charAt(i);
            //int digit = int(s);
            p.fill(0, p.constrain(p.map(time - tween, 0, 0.01, 0, 255), 0, 255));
            p.textAlign(p.CENTER, p.CENTER);
            p.text(s, x + w / 2, y + h / 2);
          }

          x += w;//textWidth(s);
          index++;
          if (index >= pi.length() - charPerPage) {
            index = 0;
          }
        }
      }
      p.fill(0);
      p.text("- " + page + " -", p.width / 2, p.height - marginy/2 - 4);
      // print(index) // 2565
      break;
      // pageNum++;
      // print("Page " + pageNum + " complete!");
      // pdf.nextPage();
    }
  }

  p.setup = function () {
    p.createCanvas(800, 800);
    pdf = p.gPdf;  // Get the renderer
    pi = "3." + p.loadStrings("../CC_97_Book_of_Pi_2/pi-10million.txt")[0];
    let f = p.createFont("Courier", 24);
    p.textFont(f);
    firstFrame = p.frameCount + 120;
  }
  p.draw = function () {
    p.renderBook();
  }

};

var myp5 = new p5(s);
