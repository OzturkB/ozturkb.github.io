class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    for (let a = 0; a < 360; a += 0.5) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }
  update(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  show() {
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
  check(walls) {
    for (let ray of this.rays) {
      var closest = null;
      var record = Infinity;
      for (let wall of walls) {
        var pt = ray.check(wall);
        if (pt) {
          var d = dist(this.pos.x, this.pos.y, pt.x, pt.y);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }
      if (closest) {
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
}