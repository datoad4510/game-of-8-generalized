import { node } from "../decisionTree/treeNode.js";
import { costEstimate } from "./costFunction.js";
import { Board } from "../board.js";

class Agent {
    // stop at max iteration count (if computation takes too long)

    /**
     *
     * @param {Board} initialBoard
     * @param {Board} targetBoard
     * @param {String} algorithm - what algorithm we are using, values: "bfs","aStar"
     * @param {number} maxIterationCount
     */
    constructor(initialBoard, targetBoard, algorithm, maxIterationCount) {
        this.root = new node(initialBoard, null);
        this.targetBoard = targetBoard;
        this.maxIterationCount = maxIterationCount;
        this.currentIterationCount = 0;
        this.algorithm = algorithm;

        // create decision tree
    }

    run() {
        if (this.algorithm === "bfs") {
            this.bfs();
        } else if (this.algorithm === "aStar") {
            this.aStar();
        } else {
            throw new Error("Input either bfs or aStar!");
        }
    }

    // algorithms
    bfs() {
        // if root and target are equal, just return 0
        if (this.root.board === this.targetBoard) return 0;
    }

    aStar() {
        // if root and target are equal, just return 0
    }
}
