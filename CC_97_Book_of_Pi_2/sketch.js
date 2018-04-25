// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Book of Pi 2
// https://youtu.be/4Ns9S-Z89-0


// instance mode by Naoto Hieda

var pi;
var pdf;

var s = function (p) {
  p.renderBook = function () {
    //int cols = 10;
    //int rows = 10;

    //beginDraw();
    let w = p.textWidth("0");//float(width)/cols;
    let h = 14.4;//float(height)/rows;
    let index = 0;



    //int totalPages = pi.length() / (cols*rows);
    //println(totalPages);

    p.background(255);

    let f = p.createFont("Courier", 12);
    p.textFont(f);

    //for (int i = 0; i < totalPages; i++) {
    let margin = 100;
    let pageNum = 0;
    while (true) {
      for (let y = margin; y < p.height - margin; y += h) {
        //for (float x = 0; x < width; x += w) {
        let x = margin;
        while (x < p.width - margin - w / 2) {
          let s = "" + pi.charAt(index);
          //int digit = int(s);
          p.fill(0);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(s, x + w / 2, y + h / 2);
          x += w;//textWidth(s);
          index++;
          if (index >= pi.length()) {
            return;
          }
        }
      }
      pageNum++;
      print("Page " + pageNum + " complete!");
      pdf.nextPage();
    }
  }

  p.setup = function () {
    p.createCanvas(850, 1150);
    pdf = p.gPdf;  // Get the renderer
    pi = "3." + p.loadStrings("../CC_97_Book_of_Pi_2/pi-10million.txt")[0];


    p.renderBook();

    print("Finished");
    p.exit();

    //endRecord();
  }

};

var myp5 = new p5(s);
