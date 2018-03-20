function Segment(sketch, point, len, angle, index) {
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
    } else {
        this.par = false;
        this.a = point;
    }
    this.len = len;
    this.angle = angle;
    this.selfAngle = angle;
    this.sw = 10 - index * 2;
    this.calculateB();

    this.xoff = sketch.random(1000);
}

Segment.prototype.wiggle = function () {
    let s = this.sketch;
    let maxangle = 2;
    let minangle = -2;
    this.selfAngle = s.map(s.noise(this.xoff), 0, 1, maxangle, minangle);
    this.xoff += 0.05;

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
    s.stroke(255);
    s.strokeWeight(this.sw);
    s.line(this.a.x, this.a.y, this.b.x, this.b.y);
}



