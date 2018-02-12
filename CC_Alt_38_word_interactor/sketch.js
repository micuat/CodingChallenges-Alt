// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AKuW48WeNMA

// instance mode by Naoto Hieda

function Word(sketch, s) {
  this.s = s;
  this.target = null;
  this.origin = s;
  this.deleting = false;
  this.adding = false;
  this.done = false;
  this.isSpace = s.match(/[a-zA-Z]/) == null;
  this.color = sketch.random(255);

  this.get = function () {
    return this.s;
  }
  this.changeTo = function (target) {
    this.target = target;
    this.deleting = true;
  }
  this.match = function (r) {
    return this.s.match(r);
  }
  this.update = function() {
    if(this.target != null) {
      if(this.deleting) {
        this.s = this.s.slice(0, -1);
        if(this.s.length == 0) {
          this.deleting = false;
          this.adding = true;
        }
      }
      else if(this.adding) {
        this.s += this.target[this.s.length];
        if(this.s == this.target) {
          this.adding = false;
          this.done = true;
        }
      }
    }
  }
  this.draw = function (x, y, h) {
    sketch.noStroke();
    if(this.isSpace == false) {
      if(this.adding || this.done) {
        sketch.colorMode(sketch.HSB);
        sketch.fill(this.color, 255, 255);
        sketch.rect(x, y - h + 7, sketch.textWidth(this.s), h)
      }
      else {
      }
    }
    sketch.colorMode(sketch.RGB);
    sketch.fill(255);
    sketch.text(this.s, x, y);
  }
}

var text = 'A rainbow is a meteorological phenomenon that is caused by reflection, refraction and dispersion of light in water droplets resulting in a spectrum of light appearing in the sky. It takes the form of a multicoloured arc. Rainbows caused by sunlight always appear in the section of sky directly opposite the sun.';

var words = [];

var s = function (sketch) {
  sketch.setup = function () {
    sketch.createCanvas(800, 800);
    font = sketch.createFont('Georgea', 32);
    sketch.textFont(font);

    let swords = text.split(/(\W+)/);
    for(let i in swords) {
      words[i] = new Word(sketch, swords[i]);
    }
  }

  sketch.draw = function () {
    sketch.background(0);
    sketch.fill(255);

    sketch.textSize(32);
    let maxLength = 600;
    let j = 0;
    let w = 0;
    for(let i in words) {
      words[i].update();
      let word = words[i].get();
      let ww = sketch.textWidth(word);
      if(w + ww> maxLength && !word.match(/[^a-zA-Z]+/)) {
        j++;
        w = 0;
      }
      words[i].draw(100 + w, 100 + 34 * j, 33);
      w += ww;
    }

    if (sketch.frameCount % 10 == 0) {
      let index = 0;
      do {
        index = sketch.floor(sketch.random(words.length));
      } while(words[index].match(/[^a-zA-Z]+/))

      if(words[index].match(/^[A-Z]/)) {
        words[index].changeTo('Rainbow');
      }
      else {
        words[index].changeTo('rainbow');
      }
    }
  }
};

var myp5 = new p5(s);
