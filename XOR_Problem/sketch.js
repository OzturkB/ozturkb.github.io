var nn;
var data = [{
  input: [0, 0],
  target: [0]
}, {
  input: [1, 1],
  target: [0]
}, {
  input: [1, 0],
  target: [1]
}, {
  input: [0, 1],
  target: [1]
}];
// var target;

function setup() {
  nn = new NeuralNetwork(2, 4, 1);
  // input = [1, 0];
  // target = [1];
  for (let i = 0; i < 500000; i++) {
    let rnd = random(data);
    nn.train(rnd.input, rnd.target);
    // for (let i = 0; i < data.length; i++) {
    //   nn.train(data[i].input, data[i].target);
    // }
  }
  console.log(nn.guess([1, 0]));
  console.log(nn.guess([0, 1]));
  console.log(nn.guess([1, 1]));
  console.log(nn.guess([0, 0]));
}

function draw() {

}