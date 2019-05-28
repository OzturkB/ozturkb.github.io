class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }
  show() {
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }
  check(wall) {
    var x1 = wall.pos1.x;
    var y1 = wall.pos1.y;
    var x2 = wall.pos2.x;
    var y2 = wall.pos2.y;
    var x3 = this.pos.x;
    var y3 = this.pos.y;
    var x4 = this.pos.x + this.dir.x;
    var y4 = this.pos.y + this.dir.y;

    var bolen = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (bolen == 0) {
      return null;
    }
    var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / bolen;
    var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / bolen;
    if (t < 1 && t > 0 && u > 0) {
      var tmp_x = x1 + t * (x2 - x1);
      var tmp_y = y1 + t * (y2 - y1);
      return createVector(tmp_x, tmp_y);
    } else {
      return null;
    }
  }
}