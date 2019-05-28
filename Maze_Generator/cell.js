class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.travelled = false;
    this.walls = {
      "up": true,
      "right": true,
      "down": true,
      "left": true
    };
  }

  index(x, y) {
    if (x < 0 || x > cols - 1 || y < 0 || y > rows - 1) {
      return null;
    }
    return x + y * cols;
  }

  drawCell() {
    var x = this.x * w;
    var y = this.y * w;
    stroke(255);
    strokeWeight(2);
    if (this.walls["up"]) {
      line(x, y, x + w, y);
    }
    if (this.walls["right"]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls["down"]) {
      line(x, y + w, x + w, y + w);
    }
    if (this.walls["left"]) {
      line(x, y, x, y + w);
    }
    if (this.visited) {
      noStroke();
      fill(220, 0, 220);
      rect(x, y, w, w);
    }
    if (this == current) {
      fill(90, 0, 90);
      rect(x, y, w, w);
    }
  }

  checkNeighbors() {
    var neighbors = [];
    var up = cells[this.index(this.x, this.y - 1)];
    var right = cells[this.index(this.x + 1, this.y)];
    var down = cells[this.index(this.x, this.y + 1)];
    var left = cells[this.index(this.x - 1, this.y)];
    if (up && !up.visited) {
      neighbors.push(up);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (down && !down.visited) {
      neighbors.push(down);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (neighbors.length > 0) {
      var rnd = floor(random(0, neighbors.length));
      return neighbors[rnd];
    } else {
      return null;
    }
  }
}