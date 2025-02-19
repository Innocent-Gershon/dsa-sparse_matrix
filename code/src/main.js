const SparseMatrix = require("./sparseMatrix");
const MatrixOperations = require("./operations");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Sparse Matrix Operations");
console.log("1. Addition");
console.log("2. Subtraction");
console.log("3. Multiplication");

rl.question("Select operation (1/2/3): ", (choice) => {
    try {
        let matA = new SparseMatrix("../sample_inputs/matrix1.txt");
        let matB = new SparseMatrix("../sample_inputs/matrix2.txt");
        let result;

        switch (choice) {
            case "1":
                result = MatrixOperations.add(matA, matB);
                console.log("Addition Result:");
                break;
            case "2":
                result = MatrixOperations.subtract(matA, matB);
                console.log("Subtraction Result:");
                break;
            case "3":
                result = MatrixOperations.multiply(matA, matB);
                console.log("Multiplication Result:");
                break;
            default:
                console.log("Invalid choice");
                rl.close();
                return;
        }

        result.printMatrix();
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
    rl.close();
});
