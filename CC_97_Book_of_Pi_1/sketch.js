// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Book of Pi 1
// https://youtu.be/tbvG9hrJxOU

// instance mode by Naoto Hieda

var pi;

var s = function (p) {
  p.setup = function () {
    p.createCanvas(1000, 1000);
    // let pdf = p.g;  // Get the renderer
    let pdf = p.gPdf;
    pi = p.loadStrings("../CC_97_Book_of_Pi_1/pi-10million.txt")[0];

    let cols = 100;
    let rows = 100;

    //beginDraw();
    p.colorMode(p.HSB, 1.0);
    let w = p.width / cols;
    let h = p.height / rows;
    let index = 0;

    let totalPages = pi.length() / (cols * rows);
    print(totalPages);

    for (let i = 0; i < 2; i++) {

      for (let y = 0; y < p.height; y += h) {
        for (let x = 0; x < p.width; x += w) {
          let s = "" + pi.charAt(index);
          let digit = p.nf(s);
          let hue = digit / 10.0;
          p.fill(hue, 1, 1);
          p.noStroke();
          p.rect(x, y, w, h);
          // fill(255-bright);
          //textAlign(CENTER,CENTER);
          //text(digit,x+w/2,y+h/2);
          index++;
          if (index >= pi.length()) {
            index = pi.length() - 1;
          }
        }
      }
      print("Page " + i + " complete!");
      pdf.nextPage();
    }
    print("Finished");
    p.exit();
    //endRecord();
  }
};

var myp5 = new p5(s);
