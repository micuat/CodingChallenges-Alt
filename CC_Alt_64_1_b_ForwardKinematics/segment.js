function Segment(sketch, point, len, angle, index) {
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
    // if(this.sw == 10) {
    //     maxangle *= 0.1;
    //     minangle *= 0.1;
    // }
    this.selfAngle = s.map(s.noise(this.xoff), 0, 1, maxangle, minangle);
    if(s.millis() * 0.001 % 4 < 2) {
        this.xoff += 0.005;
    }
    else {
        this.xoff += 0.02;
    }

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

Segment.prototype.show = function(pg, col) {
    let s = this.sketch;
    if(pg === undefined) pg = s;
    let a = this.a.copy();
    let b = this.b.copy();
    a.sub(b);
    let an = a.heading();
    pg.stroke(255, an * 100, -an * 100, col);
    pg.strokeWeight(this.sw);
    pg.line(this.a.x, this.a.y, this.b.x, this.b.y);
}



