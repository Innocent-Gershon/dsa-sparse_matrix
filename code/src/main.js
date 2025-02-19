const SparseMatrix = require("./SparseMatrix");
const MatrixOperations = require("./operations");
const readline = require("readline");
const path = require("path");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Sparse Matrix Operations:");
console.log("1️⃣. Addition ➕");
console.log("2️⃣. Subtraction ➖ ");
console.log("3️⃣. Multiplication ✖️");

rl.question("Choose an operation (1️⃣ ➡️ 3️⃣): ", function(choice) {
    try {
        choice = choice.trim(); 

        
        const matrix1Path = path.join(__dirname, "../sample_inputs/matrix1.txt");
        const matrix2Path = path.join(__dirname, "../sample_inputs/matrix2.txt");

        console.log(`🔍 Checking files...`);
        console.log(`📄 Matrix 1 Path: ${matrix1Path}`);
        console.log(`📄 Matrix 2 Path: ${matrix2Path}`);

        
        if (!fs.existsSync(matrix1Path)) {
            throw new Error(`File not found: ${matrix1Path}`);
        }
        if (!fs.existsSync(matrix2Path)) {
            throw new Error(`File not found: ${matrix2Path}`);
        }

        console.log("✅ Files found. Loading matrices...");

        let matA = new SparseMatrix(matrix1Path);
        let matB = new SparseMatrix(matrix2Path);
        let result;

        switch (choice) {
            case "1":
                console.log("➕ Performing Addition...");
                result = MatrixOperations.add(matA, matB);
                break;
            case "2":
                console.log("➖ Performing Subtraction...");
                result = MatrixOperations.subtract(matA, matB);
                break;
            case "3":
                console.log("✖️ Performing Multiplication...");
                result = MatrixOperations.multiply(matA, matB);
                break;
            default:
                console.error(`❌ Invalid choice: "${choice}". Please enter 1, 2, or 3.`);
                rl.close();
                return;
        }

        console.log("✅ Operation completed. Result:");
        result.printMatrix();

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    } finally {
        rl.close();
    }
});
