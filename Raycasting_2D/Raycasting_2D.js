var walls = [];
var v1;
var v2;
var particle;
var xoff = 0;
var yoff = 10000;

function setup() {
  createCanvas(600, 600);
  particle = new Particle();
  v1 = createVector();
  v2 = createVector();
  walls.push(new Wall(0, 0, 0, height));
  walls.push(new Wall(0, 0, width, 0));
  walls.push(new Wall(0, height, width, height));
  walls.push(new Wall(width, 0, width, height));
  // for (let i = 0; i < 5; i++) {
  //   walls.push(new Wall(random(width), random(height), random(width), random(height)));
  // }
  // walls.push(new Wall(300, 100, 500, 300));
  // walls.push(new Wall(100, 200, 200, 100));
}

function draw() {
  background(0);
  particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();
  xoff += 0.001;
  yoff += 0.001;
  for (let wall of walls) {
    wall.show();
  }
  particle.check(walls);
}

function mousePressed() {
  v1.x = mouseX;
  v1.y = mouseY;
}

function mouseReleased() {
  v2.x = mouseX;
  v2.y = mouseY;
  walls.push(new Wall(v1.x, v1.y, v2.x, v2.y));
}