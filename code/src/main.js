const SparseMatrix = require("./SparseMatrix");
const MatrixOperations = require("./operations");
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Sparse Matrix Operations:");
console.log("1️⃣. Addition ➕");
console.log("2️⃣. Subtraction ➖ ");
console.log("3️⃣. Multiplication ✖️");

rl.question("Choose an operation ( 1️⃣ ➡️ 3️⃣  ): ", function(choice) {
    try {
        // Ensure correct file paths
        const matrix1Path = path.join(__dirname, "../sample_inputs/matrix1.txt");
        const matrix2Path = path.join(__dirname, "../sample_inputs/matrix2.txt");

        let matA = new SparseMatrix(matrix1Path);
        let matB = new SparseMatrix(matrix2Path);
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
