import { Board } from "./board.js";
import { Agent } from "../classes/Ai Agent/agent.js";
import { arrayEqual } from "../helpers/arrayEqual.js";
export class gridController {
    /**
     * @callback onWin
     *
     */

    /** @type {onWin} */

    /**
     *
     * @param {Board} board initial board configuration
     * @param {Board} targetBoard target board configuration
     * @type {onWin} callback function for what happens when you win
     * @param {{name: string, maxIterationCount: number}} algorithm
     * @param {Array.<string>} optimalPath moves that get us from initial board to final board (leave empty if unknown)
     */
    constructor(
        grid,
        board,
        targetBoard,
        onWin = () => {},
        algorithm = {
            name: "bfs",
            maxIterationCount: Infinity,
        },
        optimalPath = []
    ) {
        this.grid = grid;
        this.board = board;
        this.initialBoard = new Board(-1, -1, this.board);
        this.targetBoard = targetBoard;
        this.onWin = onWin;
        this.optimalPath = optimalPath;
        this.algorithm = algorithm;
        this.checkOver();
    }

    getGridCell(row, col) {
        return this.grid.getElementsByClassName(`cell_${row}${col}`)[0];
    }

    setGridCell(row, col, val) {
        this.grid.getElementsByClassName(`cell_${row}${col}`)[0].innerText =
            val;
    }

    resetGrid() {
        // reset inner state
        this.board = new Board(-1, -1, this.initialBoard);

        // reset ui
        for (let row = 0; row < this.board.rows; row++) {
            for (let col = 0; col < this.board.cols; col++) {
                const initialValue = this.initialBoard.getValue(row, col);

                if (initialValue === 0) {
                    this.setGridCell(row, col, "");
                    continue;
                }

                this.setGridCell(row, col, initialValue);
            }
        }
    }

    async getAnswer() {
        // this.optimalPath = this.agent.run();
        const agentWorker = new Worker(
            "./javascript/classes/Ai Agent/webWorker.js",
            { type: "module" }
        );

        // get this data because this context changes
        // ! also, objects can't be passed to web workers!
        const rows = this.board.rows;
        const cols = this.board.cols;
        const board = this.board.board;
        const targetBoard = this.targetBoard.board;
        const algorithm = this.algorithm.name;
        const maxIterationCount = this.algorithm.maxIterationCount;

        // promisify passing data and getting answer from worker
        // if we didn't do this, the function would finish before the calculations were returned
        const answerPromise = new Promise(function (resolve) {
            agentWorker.postMessage([
                rows,
                cols,
                board,
                targetBoard,
                algorithm,
                maxIterationCount,
            ]);

            agentWorker.onmessage = function (event) {
                resolve(event.data);
            };
        });

        this.optimalPath = await answerPromise;
    }

    /**
     *
     * @param {HTMLElement} cell1
     * @param {HTMLElement} cell2
     */
    swapCellText(cell1, cell2) {
        const temp = cell1.innerText;
        cell1.innerText = cell2.innerText;
        cell2.innerText = temp;

        this.checkOver();
    }

    // check if game is over
    checkOver() {
        if (arrayEqual(this.board.board, this.targetBoard.board)) {
            // this.onWin(this);
            this.onWin();
            return true;
        } else return false;
    }

    // movement of frontend grid
    moveGrid(direction) {
        // this context changes if we don't use arrow functions
        const directions = {
            up: {
                offset: [-1, 0],
                moveBoard: () => {
                    this.board.moveBoard(direction);
                },
            },
            right: {
                offset: [0, 1],
                moveBoard: () => {
                    this.board.moveBoard(direction);
                },
            },
            down: {
                offset: [1, 0],
                moveBoard: () => {
                    this.board.moveBoard(direction);
                },
            },
            left: {
                offset: [0, -1],
                moveBoard: () => {
                    this.board.moveBoard(direction);
                },
            },
        };

        const offset = directions[direction].offset;
        const moveBoard = directions[direction].moveBoard;

        let { row, col } = this.board.zeroPosition;
        const emptyCell = this.getGridCell(row, col);

        row += offset[0];
        col += offset[1];

        // check if new zeroPositions is out of bounds
        if (
            row < 0 ||
            row >= this.board.rows ||
            col < 0 ||
            col >= this.board.cols
        )
            return;

        const movingCell = this.getGridCell(row, col);

        this.swapCellText(emptyCell, movingCell);

        moveBoard();

        this.checkOver();
    }
}
