function Segment(sketch, freq, point, len, angle) {
    /* Unlike in Java, JavaScript does not have implement
     * function overloading, which means we cannot simply have
     * two different constructors for our Segment class as Shiffman does in
     * his pde example. Instead, we must have one constructor function
     * which behaves differently depending on the type of arguments we pass.
     */
    this.sketch = sketch;
    if (point.angle !== undefined) { // point is probably a Segment
        this.par = point;
        this.a = new p5.Vector(this.par.b.x, this.par.b.y);
        this.xoff = point.xoff + freq;
        this.off = point.off;
    } else {
        this.par = false;
        this.a = point;
        this.xoff = freq;
        this.off = freq;
    }
    this.len = len;
    this.angle = angle;
    this.selfAngle = angle;
    this.calculateB();

}

Segment.prototype.wiggle = function () {
    let s = this.sketch;
    let maxangle = 1*0.1;
    let minangle = -1*0.1;
    this.selfAngle = s.map(s.sin(s.millis()*0.0001)*s.sin(s.millis()*0.01+this.off)*s.cos(this.xoff), -1, 1, maxangle, minangle);
    // this.selfAngle = s.map(s.noise(this.xoff), 0, 1, maxangle, minangle);
    // this.xoff += 0.06;

    //this.selfAngle += 0.01;
}

Segment.prototype.update = function () {
    let s = this.sketch;
    this.angle = this.selfAngle;
    if (this.par) {
        this.a = this.par.b.copy();
        this.angle += this.par.angle;
    } else {
        this.angle += -s.PI / 2;

    }
    this.calculateB();
}

Segment.prototype.calculateB = function () {
    let dx = this.len * Math.cos(this.angle);
    let dy = this.len * Math.sin(this.angle);
    this.b = new p5.Vector(this.a.x + dx, this.a.y + dy);
}

Segment.prototype.show = function() {
    let s = this.sketch;
    let r = s.map(this.selfAngle, 0, 0.1, 100, 255);
    let g = s.map(this.selfAngle, 0, -0.1, 100, 255);
    let b = 0;
    s.stroke(r, g, b);
    s.strokeWeight(4);
    s.line(this.a.x, this.a.y, this.b.x, this.b.y);
}



