const fs = require("fs");

class SparseMatrix {
    constructor(filePath) {
        this.matrix = {};
        this.numRows = 0;
        this.numCols = 0;

        if (filePath) {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }
            this.loadFromFile(filePath);
        }
    }

    loadFromFile(filePath) {
        try {
            console.log(`Loading matrix from: ${filePath}`);

            const data = fs.readFileSync(filePath, "utf-8").trim().split("\n");
            let rowCountSet = false, colCountSet = false;

            for (let line of data) {
                line = line.trim();
                if (!line) continue;

                if (line.startsWith("rows=")) {
                    this.numRows = parseInt(line.split("=")[1]);
                    if (isNaN(this.numRows)) throw new Error("Invalid row count format");
                    rowCountSet = true;
                } else if (line.startsWith("cols=")) {
                    this.numCols = parseInt(line.split("=")[1]);
                    if (isNaN(this.numCols)) throw new Error("Invalid column count format");
                    colCountSet = true;
                } else {
                    if (!rowCountSet || !colCountSet) 
                        throw new Error("Matrix dimensions must be defined before elements");

                    if (!line.startsWith("(") || !line.endsWith(")")) 
                        throw new Error(`Invalid format: ${line}`);

                    let values = line.slice(1, -1).split(",");
                    if (values.length !== 3) throw new Error(`Invalid entry format: ${line}`);

                    let [row, col, val] = values.map(Number);
                    if (isNaN(row) || isNaN(col) || isNaN(val)) 
                        throw new Error(`Non-numeric values found: ${line}`);

                    this.setElement(row, col, val);
                }
            }

            console.log("Matrix loaded successfully.");
        } catch (error) {
            console.error(`Error loading matrix: ${error.message}`);
            throw error;  
        }
    }

    setElement(row, col, value) {
        if (value !== 0) {
            this.matrix[`${row},${col}`] = value;
        } else {
            delete this.matrix[`${row},${col}`];
        }
    }

    getElement(row, col) {
        return this.matrix[`${row},${col}`] || 0;
    }

    printMatrix() {
        console.log(`Rows: ${this.numRows}, Columns: ${this.numCols}`);
        console.log("Non-zero elements:", this.matrix);
    }
}

module.exports = SparseMatrix;
