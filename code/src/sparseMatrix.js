const fs = require("fs");

class SparseMatrix {
    constructor(filePath) {
        this.matrix = {};
        this.numRows = 0;
        this.numCols = 0;
        if (filePath) this.loadFromFile(filePath);
    }

    loadFromFile(filePath) {
        try {
            const data = fs.readFileSync(filePath, "utf-8").split("\n");
            let rowCountSet = false, colCountSet = false;
            
            for (let line of data) {
                line = line.trim();
                if (!line) continue;

                if (line.startsWith("rows=")) {
                    this.numRows = parseInt(line.split("=")[1]);
                    rowCountSet = true;
                } else if (line.startsWith("cols=")) {
                    this.numCols = parseInt(line.split("=")[1]);
                    colCountSet = true;
                } else {
                    if (!rowCountSet || !colCountSet) 
                        throw new Error("Input file has wrong format");

                    if (!line.startsWith("(") || !line.endsWith(")")) 
                        throw new Error("Input file has wrong format");

                    let [row, col, val] = line.slice(1, -1).split(",").map(Number);
                    if (isNaN(row) || isNaN(col) || isNaN(val)) 
                        throw new Error("Input file has wrong format");

                    this.setElement(row, col, val);
                }
            }
        } catch (error) {
            console.error(`Error loading matrix: ${error.message}`);
            process.exit(1);
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

