import { node } from "../decisionTree/treeNode.js";
import { Board } from "../board.js";
import { arrayEqual } from "../../helpers/arrayEqual.js";
import { arrayHashSet } from "../../helpers/arrayHashSet.js";
export class Agent {
    // stop at max iteration count (if computation takes too long)

    /**
     *
     * @param {Board} initialBoard
     * @param {Board} targetBoard
     * @param {String} algorithm - what algorithm we are using, values: "bfs","aStar"
     * @param {number} maxIterationCount
     */
    constructor(initialBoard, targetBoard, algorithm, maxIterationCount) {
        this.root = new node(new Board(-1, -1, initialBoard), null);
        this.targetBoard = new Board(-1, -1, targetBoard);
        this.maxIterationCount = maxIterationCount;
        this.currentIterationCount = 0;
        this.algorithm = algorithm;

        // create decision tree
    }

    // returns moves from root to target or throws error
    run() {
        if (this.algorithm === "bfs") {
            return this.getOptimalMoves(this.bfs());
        } else if (this.algorithm === "aStar") {
            return this.getOptimalMoves(this.aStar());
        } else {
            throw new Error("Input either bfs or aStar!");
        }
    }

    // algorithms
    bfs() {
        // if root and target are equal, just return 0
        if (arrayEqual(this.root.board.board, this.targetBoard.board)) return 0;

        // queue for bfs
        let queue = [];

        // set of visited boards
        let visited = new arrayHashSet();

        queue.push(this.root);
        visited.add(this.root.board.board);

        while (queue.length !== 0) {
            const children = queue[0].getChildren();

            for (const child of children) {
                // if child has already been visitied skip it
                if (visited.has(child.board.board)) {
                    continue;
                }

                // if child is target
                if (arrayEqual(child.board.board, this.targetBoard.board))
                    return child;

                queue.push(child);
                visited.add(child.board.board);

                ++this.currentIterationCount;

                if (this.currentIterationCount > this.maxIterationCount) {
                    return "Number of max iterations exceeded";
                }
            }

            queue.shift();
        }
        return "No solution";
    }

    aStar() {
        // if root and target are equal, just return 0
    }

    // gets an array of optimal moves in order to get from initial to target
    /**
     *
     * @param {node} targetNode target node in the tree that was found earlier
     */
    getOptimalMoves(targetNode) {
        if (targetNode === 0) {
            return "Already at answer";
        }
        if (targetNode === "No solution") {
            return "No solution";
        }
        if (targetNode === "Number of max iterations exceeded") {
            return "Number of max iterations exceeded";
        }
        const path = targetNode.getPathFromRoot();

        // for each parent node, find out how 0 was moved to get to the child
        for (let index = 0; index < path.length - 1; index++) {
            path[index] = path[index].board.whatMove(
                path[index + 1].board.board
            );
        }

        path.pop();

        return path;
    }
}
