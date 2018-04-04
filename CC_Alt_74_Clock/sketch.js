// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Clock
// Video: https://youtu.be/E4RyStef-gY

// instance mode by Naoto Hieda

var rot = 0;

var s = function (p) {

  p.setup = function () {
    p.createCanvas(800, 800);
    //p.angleMode(p.DEGREES);
  }

  p.draw = function () {
    p.background(200);
    p.translate(p.width/2, p.height/2);
    p.rotate(p.radians(-90));

    let hr = p.hour();
    let mn = p.minute();
    //let sc = p.second();

    let ms = java.lang.System.currentTimeMillis();
    let sc = p.floor(ms * 0.001 % 60);
    ms = ms % 1000 * 0.001;

    ms *= ms;

    let easeInOutBack = function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }
    let easeInOutQuart = function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
    }

    p.strokeWeight(1);
    p.stroke(255, 100, 150);
    p.noFill();
    ms = p.constrain(p.map(ms, 0.25, 0.75, 0, 1), 0, 1);
    let secondAngle = p.map(sc + easeInOutBack(0, ms, 0, 1, 1, 1), 0, 60, 0, 360);
    // p.arc(0, 0, 300, 300, 0, p.radians(secondAngle));

    p.stroke(150, 100, 255);
    let minuteAngle = p.map(mn, 0, 60, 0, 360);
    // p.arc(0, 0, 280, 280, 0, p.radians(minuteAngle));

    p.stroke(150, 255, 100);
    let hourAngle = p.map(hr % 12, 0, 12, 0, 360);
    // p.arc(0, 0, 260, 260, 0, p.radians(hourAngle));

    p.lights();
    p.noStroke();

    // p.rotate(p.radians(-p.map(sc + ms, 0, 60, 0, 360) + 90));
    if(rot > secondAngle) {rot = secondAngle}
    rot = p.lerp(rot, secondAngle, 0.1);
    p.rotate(p.radians(-rot + 120));

    p.rectMode(p.CENTER);
    p.fill(255, 0, 0);
    p.rect(0, 0, 110, 110);
    p.fill(50);
    p.rect(0, 0, 100, 100);

    p.push();
    p.rotate(p.radians(minuteAngle));
    p.fill(255);
    p.beginShape();
    p.vertex(0, 5);
    p.vertex(225, 5);
    p.vertex(225, -5);
    p.vertex(0, -5);
    p.endShape();
    p.pop();

    p.push();
    p.rotate(p.radians(hourAngle));
    p.fill(255);
    p.beginShape();
    p.vertex(0, 5);
    p.vertex(150, 5);
    p.vertex(150, -5);
    p.vertex(0, -5);
    p.endShape();
    p.pop();


    p.push();
    p.rotate(p.radians(secondAngle));
    p.fill(255, 0, 0);
    // p.line(0, 0, 100, 0);
    p.beginShape();
    p.vertex(0, 2);
    p.vertex(300, 2);
    p.vertex(300, -2);
    p.vertex(0, -2);
    p.endShape();
    p.pop();

    // p.stroke(255);
    p.fill(255, 0, 0);
    p.ellipse(0, 0, 20);


    //  fill(255);
    //  noStroke();
    //  text(hr + ':' + mn + ':' + sc, 10, 200);


  }

};

var myp5 = new p5(s);
