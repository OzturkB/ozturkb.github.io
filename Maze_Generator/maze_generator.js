var w = 40;
var cells = [];
var cols, rows;
var current;
var next;
var stack = [];
var done = false;

function removeWalls(a, b) {
  var x = a.x - b.x;
  var y = a.y - b.y;
  if (x == -1) {
    a.walls["right"] = false;
    b.walls["left"] = false;
  } else if (x == 1) {
    a.walls["left"] = false;
    b.walls["right"] = false;
  }
  if (y == 1) {
    a.walls["up"] = false;
    b.walls["down"] = false;
  } else if (y == -1) {
    a.walls["down"] = false;
    b.walls["up"] = false;
  }
}

function checkWalls(a) {
  var x = a.x;
  var y = a.y;
  var up, right, down, left;
  var available = [];
  if (y > 0) {
    up = cells[x + (y - 1) * cols];
  }
  if (x < cols - 1) {
    right = cells[(x + 1) + y * cols];
  }
  if (y < rows - 1) {
    down = cells[x + (y + 1) * cols];
  }
  if (x > 0) {
    left = cells[(x - 1) + y * cols];
  }
  if (up) {
    if (!a.walls["up"] && !up.walls["down"] && !up.travelled) {
      available.push(up);
    }
  }
  if (right) {
    if (!a.walls["right"] && !right.walls["left"] && !right.travelled) {
      available.push(right);
    }
  }
  if (down) {
    if (!a.walls["down"] && !down.walls["up"] && !down.travelled) {
      available.push(down);
    }
  }
  if (left) {
    if (!a.walls["left"] && !left.walls["right"] && !left.travelled) {
      available.push(left);
    }
  }
  if (available.length > 0) {
    var rnd = floor(random(0, available.length));
    return available[rnd];
  } else {
    return null;
  }
}

function drawLine() {
  for (var i = 0; i < stack.length - 1; i++) {
    stroke(60);
    strokeWeight(1);
    line(stack[i].x * w + w / 2, stack[i].y * w + w / 2, stack[i + 1].x * w + w / 2, stack[i + 1].y * w + w / 2);
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(20);
  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      var tmp = new Cell(j, i);
      cells.push(tmp);
    }
  }
  current = cells[0];
  stack.push(current);
}

function draw() {

  background(60);
  for (let i = 0; i < cells.length; i++) {
    cells[i].drawCell();
  }

  if (!done) {
    current.visited = true;
    next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      removeWalls(current, next);
      stack.push(next);
      current = next;
    } else {
      if (stack.length > 0) {
        current = stack.pop();
        if (current == cells[0]) {
          done = true;
        }
      }
    }
  } else {
    if (current != cells[99]) {
      var line = checkWalls(current);
      if (line) {
        current.travelled = true;
        line.travelled = true;
        stack.push(current);
        current = line;
      } else {
        if (stack.length > 0) {
          current = stack.pop();
        }
      }
    } else {
      stack.push(current);
    }
    drawLine();
  }
}