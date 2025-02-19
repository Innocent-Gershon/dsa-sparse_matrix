class MatrixOperations {
  static add(matA, matB) {
      if (matA.numRows !== matB.numRows || matA.numCols !== matB.numCols) {
          throw new Error("Matrix dimensions must match for addition");
      }

      let result = new SparseMatrix();
      result.numRows = matA.numRows;
      result.numCols = matA.numCols;

      for (let key in matA.matrix) {
          result.setElement(...key.split(",").map(Number), matA.matrix[key]);
      }

      for (let key in matB.matrix) {
          let [row, col] = key.split(",").map(Number);
          let value = result.getElement(row, col) + matB.matrix[key];
          result.setElement(row, col, value);
      }

      return result;
  }

  static subtract(matA, matB) {
      if (matA.numRows !== matB.numRows || matA.numCols !== matB.numCols) {
          throw new Error("Matrix dimensions must match for subtraction");
      }

      let result = new SparseMatrix();
      result.numRows = matA.numRows;
      result.numCols = matA.numCols;

      for (let key in matA.matrix) {
          result.setElement(...key.split(",").map(Number), matA.matrix[key]);
      }

      for (let key in matB.matrix) {
          let [row, col] = key.split(",").map(Number);
          let value = result.getElement(row, col) - matB.matrix[key];
          result.setElement(row, col, value);
      }

      return result;
  }

  static multiply(matA, matB) {
      if (matA.numCols !== matB.numRows) {
          throw new Error("Invalid matrix dimensions for multiplication");
      }

      let result = new SparseMatrix();
      result.numRows = matA.numRows;
      result.numCols = matB.numCols;

      for (let keyA in matA.matrix) {
          let [row, colA] = keyA.split(",").map(Number);
          let valueA = matA.matrix[keyA];

          for (let keyB in matB.matrix) {
              let [rowB, colB] = keyB.split(",").map(Number);
              if (colA === rowB) {
                  let product = valueA * matB.matrix[keyB];
                  let currentValue = result.getElement(row, colB);
                  result.setElement(row, colB, currentValue + product);
              }
          }
      }

      return result;
  }
}

module.exports = MatrixOperations;
