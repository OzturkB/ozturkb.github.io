var data = [];
var m = 1;
var b = 0;

function mousePressed() {
  var x = map(mouseX, 0, width, 0, 1);
  var y = map(mouseY, 0, height, 1, 0);
  data.push(createVector(x, y));
}

function lineerRegression() {
  var avgX = 0;
  var avgY = 0;
  var bolunen = 0;
  var bolen = 0;
  for (let i = 0; i < data.length; i++) {
    avgX += data[i].x;
    avgY += data[i].y;
  }
  avgX /= data.length;
  avgY /= data.length;
  for (let i = 0; i < data.length; i++) {
    var ortak = data[i].x - avgX;
    bolunen += ortak * (data[i].y - avgY);
    bolen += Math.pow(ortak, 2);
  }
  m = bolunen / bolen;
  b = avgY - m * avgX;
}

function drawLine() {
  var x1 = 0;
  var x2 = 1;
  var y1 = m * x1 + b;
  var y2 = m * x2 + b;
  x1 = map(x1, 0, 1, 0, width);
  x2 = map(x2, 0, 1, 0, width);
  y1 = map(y1, 0, 1, height, 0);
  y2 = map(y2, 0, 1, height, 0);
  stroke(0, 255, 255);
  line(x1, y1, x2, y2);
}

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(51);
  for (let i = 0; i < data.length; i++) {
    var x = map(data[i].x, 0, 1, 0, width);
    var y = map(data[i].y, 0, 1, height, 0);
    fill(255);
    noStroke();
    ellipse(x, y, 8, 8);
  }
  if (data.length > 1) {
    lineerRegression();
    drawLine();
  }
}