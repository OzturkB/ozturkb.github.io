class Vehicle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxVel = random(4, 8);
    this.maxForce = random(0.2, 0.6);
    this.health = 1;
    this.lifetime = 0;
    this.dna = [];
    this.dna[0] = random(-2, 2);
    this.dna[1] = random(-2, 2);
  }

  update() {
    this.health -= 0.005;
    this.lifetime++;
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
    // this.border();
  }

  // border() {
  //   var border;
  //   if (this.pos.x < 0) {
  //     border = createVector(0, this.pos.y);
  //     border.mult(-1);
  //     border.setMag(this.maxVel);
  //     this.applyForce(border);
  //   } else if (this.pos.x + r > width) {
  //     border = createVector(width, this.pos.y);
  //     border.mult(-1);
  //     border.setMag(this.maxVel);
  //     this.applyForce(border);
  //   }
  //   if (this.pos.y < 0) {
  //     border = createVector(this.pos.x, 0);
  //     border.mult(-1);
  //     border.setMag(this.maxVel);
  //     this.applyForce(border);
  //   } else if (this.pos.y + r > height) {
  //     border = createVector(this.pos.x, height);
  //     border.mult(-1);
  //     border.setMag(this.maxVel);
  //     this.applyForce(border);
  //   }
  // }

  applyForce(force) {
    this.acc.add(force);
  }

  dead() {
    if (this.health < 0) {
      return true;
    } else {
      return false;
    }
  }

  behavior(good, bad) {
    var steerG = this.eat(good, 0.2);
    var steerB = this.eat(bad, -1);
    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  seek(target) {
    var desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxVel);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  eat(list, nutrition) {
    var record = Infinity;
    var closest = -1;
    for (let i = 0; i < list.length; i++) {
      var d = this.pos.dist(list[i]);
      if (d < record) {
        record = d;
        closest = i;
      }
    }
    if (closest > -1) {
      if (record < 10) {
        list.splice(closest, 1);
        this.health += nutrition;
      } else {
        return this.seek(list[closest]);
      }
    }
    return createVector(0, 0);
  }

  display() {
    var gr = color(0, 255, 0);
    var rd = color(255, 0, 0);
    var clr = lerpColor(rd, gr, this.health);
    fill(clr);
    noStroke();
    rect(this.pos.x, this.pos.y, r, r);
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    line(r / 2, r / 2, this.vel.x * 5, this.vel.y * 5);
    pop();
  }
}

var vehicles = [];
var r = 13;
var maxPop = 10;
var foodPop = 50;
var poisonPop = 20;
var food = [];
var poison = [];
var fittest = 0;
var fittestIndex = null;
var mutationRate = 0.005;

function cpy(target) {
  var tmp = new Vehicle();
  tmp.maxVel = target.maxVel;
  tmp.maxForce = target.maxForce;
  tmp.dna = target.dna;
  tmp.maxVel = (target.maxVel + random(4, 8)) / 2;
  tmp.maxForce = (target.maxForce + random(0.2, 0.6)) / 2;
  tmp.dna[0] = (target.dna[0] + random(-2, 2)) / 2;
  tmp.dna[1] = (target.dna[1] - random(-2, 2)) / 2;
  return tmp;
}

function setup() {
  createCanvas(1200, 800);
  frameRate(60);
  for (let i = 0; i < maxPop; i++) {
    vehicles[i] = new Vehicle();
  }
  for (let i = 0; i < foodPop; i++) {
    food.push(createVector(random(width - r), random(height - r)));
  }
  for (let i = 0; i < poisonPop; i++) {
    poison.push(createVector(random(width - r), random(height - r)));
  }
}

function draw() {
  background(110);
  for (let i = 0; i < food.length; i++) {
    fill(0, 200, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 10, 10);
  }
  for (let i = 0; i < poison.length; i++) {
    fill(200, 0, 0);
    ellipse(poison[i].x, poison[i].y, 10, 10);

  }
  if (random(1) < 0.05) {
    food.push(createVector(random(width), random(height)));
  }
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].update();
    vehicles[i].behavior(food, poison);
    vehicles[i].display();
    if (vehicles[i].dead()) {
      vehicles.splice(i, 1);
    }
    if (random(1) < mutationRate) {
      vehicles.push(cpy(vehicles[i]));
    }
  }
  if (poison.length < poisonPop) {
    poison.push(createVector(random(width), random(height)));
  }
}