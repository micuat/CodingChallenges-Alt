// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Clock
// Video: https://youtu.be/E4RyStef-gY

// instance mode by Naoto Hieda

var s = function (p) {

  p.setup = function () {
    p.createCanvas(400, 400);
    //p.angleMode(p.DEGREES);
  }

  p.draw = function () {
    p.background(0);
    p.translate(200, 200);
    p.rotate(p.radians(-90));

    let hr = p.hour();
    let mn = p.minute();
    let sc = p.second();

    p.strokeWeight(8);
    p.stroke(255, 100, 150);
    p.noFill();
    let secondAngle = p.map(sc, 0, 60, 0, 360);
    //arc(0, 0, 300, 300, 0, secondAngle);

    p.stroke(150, 100, 255);
    let minuteAngle = p.map(mn, 0, 60, 0, 360);
    //arc(0, 0, 280, 280, 0, minuteAngle);

    p.stroke(150, 255, 100);
    let hourAngle = p.map(hr % 12, 0, 12, 0, 360);
    //arc(0, 0, 260, 260, 0, hourAngle);

    p.push();
    p.rotate(p.radians(secondAngle));
    p.stroke(255, 100, 150);
    p.line(0, 0, 100, 0);
    p.pop();

    p.push();
    p.rotate(p.radians(minuteAngle));
    p.stroke(150, 100, 255);
    p.line(0, 0, 75, 0);
    p.pop();

    p.push();
    p.rotate(p.radians(hourAngle));
    p.stroke(150, 255, 100);
    p.line(0, 0, 50, 0);
    p.pop();

    p.stroke(255);
    p.point(0, 0);


    //  fill(255);
    //  noStroke();
    //  text(hr + ':' + mn + ':' + sc, 10, 200);


  }

};

var myp5 = new p5(s);
