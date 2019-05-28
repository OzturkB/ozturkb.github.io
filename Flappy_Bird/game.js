var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
const FPS = 60;
var bx = 150;
var by = 150;
var x = 800;
var y = 0;
const w = 80;
const space = 100;
var q = 0;
var h = 0;
var frameCount = 0;
var score = 0;
var high_score = 0;
var pipes = [];
var birds = [];
const totalBirds = 1;
clear = () => {
  ctx.clearRect(0, 0, 800, 800);
}
update = () => {
  frameCount++;
  if (frameCount == 180) {
    generatePipe();
    frameCount = 0;
  }
  clear();
  birds.forEach(bird => {
    bird.updateBird();
  })
  // pipes.forEach(pipe => {
  //   pipe.updatePipe()
  //   if (pipe.isDead) {
  //     pipes.shift();
  //     // birds.forEach(bird => {bird.updateBird();})
  //     // pipes.forEach(pipe2 => {pipe2.updatePipe();})
  //   }
  // });
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].updatePipe();
    if (pipes[i].isDead) {
      pipes.splice(i, 1);
    }
  }
  check();
  high_score < score ? high_score = score : high_score = high_score;
  document.getElementById("high_score").innerHTML = high_score;
  document.getElementById("score").innerHTML = score;
}
KeyDown = (e) => {
  if (e.keyCode == 32) {
    birds[0].jump();
  }
}
generatePipe = () => {
  q = Math.random() * 800;
  if ((q + space) > 700) {
    h = 700 - space;
  } else if ((q + space) < 200) {
    h = 200 - space;
  } else {
    h = q;
  }
  var pipe = new Pipe(x, y, w, h);
  pipes.push(pipe);
}
generateBird = () => {
  var bird = new Bird(bx, by);
  birds.push(bird);
}
restart = () => {
  bx = 150;
  by = 150;
  x = 800;
  score = 0;
  frameCount = 0;
  pipes = [];
  birds = [];
  clear();
  document.getElementById("score").innerHTML = 0;
  generatePipe();
  for (let i = 0; i < totalBirds; i++) {
    generateBird();
  }
  //loop = setInterval(update, 1000/FPS);
}
check = () => {
  let dead = 0;
  birds.forEach(bird => {
    if (bird.isDead) {
      dead++;
    }
    if (dead == birds.length) {
      restart();
    }
  })
}

for (let i = 0; i < totalBirds; i++) {
  generateBird();
}
generatePipe();
window.addEventListener('keydown', KeyDown, true);
var loop = setInterval(update, 1000 / FPS);