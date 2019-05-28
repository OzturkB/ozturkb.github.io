class Dot {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.pos.y = map(this.pos.y, 0, height, height, 0);
    this.target;
    this.correct = false;
    if (f(this.pos.x) > this.pos.y) {
      this.target = 1;
    } else {
      this.target = -1;
    }
  }

  show() {
    if (this.correct) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    if (f(this.pos.x) > this.pos.y) {
      stroke(255);
    } else {
      stroke(0);
    }
    // noStroke();
    ellipse(this.pos.x, this.pos.y, 14, 14);
  }
}
class NN {
  constructor() {
    this.w1 = random(-1, 1);
    this.w2 = random(-1, 1);
    this.b = random(-1, 1);
    this.learning_rate = 0.1;
  }
  sign(x) {
    if (x >= 0) {
      return 1;
    } else {
      return -1;
    }
  }
  train(n) {
    var x = this.getX(n);
    var y = this.getY(n);
    var guess = this.w1 * x + this.w2 * y + this.b;
    guess = this.sign(guess);
    let error = n.target - guess;
    this.w1 += error * x * this.learning_rate;
    this.w2 += error * y * this.learning_rate;
    this.b += error * this.learning_rate;
    if (guess != n.target) {
      n.correct = false;
    } else {
      n.correct = true;
    }
  }
  guessY(z) {
    var x = map(z, 0, width, 0, 1);
    let y = -(this.w1 / this.w2) * x - (this.b / this.w2);
    y = map(y, 0, 1, 0, height);
    return y;
  }
  getX(n) {
    return map(n.pos.x, 0, width, 0, 1);
  }
  getY(n) {
    return map(n.pos.y, 0, height, 0, 1);
  }
}

var dots = [];
var maxDot = 100;
var nn;
var p1, p2;

function f(x) {
  return (2 * x + 50) / 2;
}

function setup() {
  createCanvas(600, 600);
  frameRate(10);
  nn = new NN();
  for (let i = 0; i < maxDot; i++) {
    dots.push(new Dot());
  }
}

function draw() {
  background(65);
  for (let i = 0; i < dots.length; i++) {
    dots[i].show();
    nn.train(dots[i]);
  }
  stroke(255);
  // strokeWeight(3);
  line(0, f(0), width, f(width));
  // stroke(0)
  // line(0, nn.guessY(0), width, nn.guessY(width));
}