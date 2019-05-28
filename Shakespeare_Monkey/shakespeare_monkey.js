class DNA {
  constructor(num) {
    this.num = num;
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < this.num; i++) {
      this.genes[i] = this.toChar();
    }
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (target[i] == this.genes[i]) {
        score++;
        this.fitness++;
      }
    }
    // this.fitness = score / target.length;
    // this.fitness += 0.01;
  }

  crossover(partner) {
    let midpoint = floor(this.genes.length / 2);
    let child = new DNA(this.genes.length);
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }
    return child;
  }

  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = this.toChar();
      }
    }
  }

  getPhrase() {
    let phrase = "";
    for (let i = 0; i < this.genes.length; i++) {
      phrase += this.genes[i];
    }
    return phrase;
  }

  toChar() {
    let rnd = floor(random(60, 122));
    if (rnd == 60) {
      rnd = 33;
    }
    if (rnd == 61) {
      rnd = 39;
    }
    if (rnd == 62) {
      rnd = 44;
    }
    if (rnd == 63) {
      rnd = 32;
    }
    if (rnd == 64) {
      rnd = 46;
    }
    return String.fromCharCode(rnd);
  }
}

class Population {
  constructor(target, maxPop, mutationRate) {
    this.target = target;
    this.maxPop = maxPop;
    this.mutationRate = mutationRate;
    this.population = [];
    this.matingPool = [];
    this.best = "";
    this.finished = false;
    this.generation = 0;
    this.undefined = false;
    for (let i = 0; i < this.maxPop; i++) {
      let tmp = new DNA(this.target.length);
      this.population.push(tmp);
    }
  }

  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.target);
    }
  }

  selection() {
    this.matingPool = [];
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    for (let i = 0; i < this.population.length; i++) {
      let fitness = floor(map(this.population[i].fitness, 0, maxFitness, 0, 1));
      let n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generate() {
    var a = floor(random(0, this.matingPool.length));
    var b = floor(random(0, this.matingPool.length));
    var parentA = this.matingPool[a];
    var parentB = this.matingPool[b];
    for (let i = 0; i < this.population.length; i++) {
      if (parentA) {
        var child = parentA.crossover(parentB);
        child.mutate(this.mutationRate);
        this.population[i] = child;
      } else {
        this.undefined = true;
      }
    }
    this.generation++;
  }

  getBest() {
    return this.best;
  }

  check() {
    let record = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > record) {
        index = i;
        record = this.population[i].fitness;
      }
    }
    this.best = this.population[index].getPhrase();
    if (this.best == this.target) {
      this.finished = true;
    }
  }
}

var target;
var maxPop;
var mutationRate;
var population;

function setup() {
  // target = "to be or not to be";
  // target = "Neuro Evolution Machine Learning Shakespeare Monkey Example";
  // target = "Feel pain, think about pain, accept pain, know pain... Shinra Tensei!";
  target = "For I believe the one who truly understands, and would know what to say to Obito is you, his friend... Kakashi.";
  maxPop = 200;
  mutationRate = 0.01;
  population = new Population(target, maxPop, mutationRate);
}

function draw() {
  if (population.undefined) {
    population = new Population(target, maxPop, mutationRate);
  }
  if (!population.finished) {
    population.calcFitness();
    population.selection();
    population.generate();
    population.check();
    document.getElementById("best").innerHTML = population.getBest();
    document.getElementById("generation").innerHTML = population.generation;
  }
}