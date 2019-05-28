class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;
    this.learning_rate = 0.1;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);

    this.weights_ih.randomize();
    this.weights_ho.randomize();
    this.bias_h.randomize();
    this.bias_o.randomize();
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  sigmoid_derivative(x) {
    return x * (1 - x);
  }

  train(input_array, targets) {
    let input = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, input);
    hidden = Matrix.add(hidden, this.bias_h);
    hidden.map(this.sigmoid);
    let guess = Matrix.multiply(this.weights_ho, hidden);
    guess = Matrix.add(guess, this.bias_o);
    guess.map(this.sigmoid);

    let target_matrix = Matrix.fromArray(targets);
    let output_errors = Matrix.subtract(target_matrix, guess);

    let gradients = Matrix.map(guess, this.sigmoid_derivative);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_rate);
    this.bias_o = Matrix.add(this.bias_o, gradients);
    let hidden_t = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_t);
    this.weights_ho = Matrix.add(this.weights_ho, weight_ho_deltas);

    let weights_ho_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(weights_ho_t, output_errors);

    let hidden_gradient = Matrix.map(hidden, this.sigmoid_derivative);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_rate);
    this.bias_h = Matrix.add(this.bias_h, hidden_gradient);
    let inputs_t = Matrix.transpose(input);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_t);
    this.weights_ih = Matrix.add(this.weights_ih, weight_ih_deltas);
  }

  guess(input_array) {
    let input = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, input);
    hidden = Matrix.add(hidden, this.bias_h);
    hidden.map(this.sigmoid);
    let guess = Matrix.multiply(this.weights_ho, hidden);
    guess = Matrix.add(guess, this.bias_o);
    guess.map(this.sigmoid);
    return guess.toArray();
  }
}