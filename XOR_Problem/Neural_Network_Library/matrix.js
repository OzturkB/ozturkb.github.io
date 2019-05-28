class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  print() {
    console.table(this.matrix);
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  add(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] += n;
      }
    }
  }

  multiply(n) {
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n.matrix[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n;
        }
      }
    }
  }

  map(f) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = f(this.matrix[i][j]);
      }
    }
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.matrix[i][j]);
      }
    }
    return arr;
  }

  static map(m, f) {
    let result = new Matrix(m.rows, m.cols);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        result.matrix[i][j] = f(m.matrix[i][j]);
      }
    }
    return result;
  }

  static transpose(m) {
    let result = new Matrix(m.cols, m.rows);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.matrix[i][j] = m.matrix[j][i];
      }
    }
    return result;
  }

  static fromArray(arr) {
    let tmp = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      tmp.matrix[i][0] = arr[i];
    }
    return tmp;
  }

  static add(m1, m2) {
    let result = new Matrix(m1.rows, m1.cols);
    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m1.cols; j++) {
        result.matrix[i][j] = m1.matrix[i][j] + m2.matrix[i][j];
      }
    }
    return result;
  }

  static subtract(m1, m2) {
    let result = new Matrix(m1.rows, m1.cols);
    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m1.cols; j++) {
        result.matrix[i][j] = m1.matrix[i][j] - m2.matrix[i][j];
      }
    }
    return result;
  }

  static multiply(m1, m2) {
    let result = new Matrix(m1.rows, m2.cols);
    if (m1.cols != m2.rows) {
      console.log("Cols and rows must match");
      return undefined;
    } else {
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          var sum = 0;
          for (let k = 0; k < m1.cols; k++) {
            sum += m1.matrix[i][k] * m2.matrix[k][j];
          }
          result.matrix[i][j] = sum;
        }
      }
    }
    return result;
  }
}