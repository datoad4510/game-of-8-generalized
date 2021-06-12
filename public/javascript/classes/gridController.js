import { Board } from "./board.js";

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
     */
    constructor(board, targetBoard, onWin) {
        this.grid = document.getElementById("grid");
        this.board = board;
        this.targetBoard = targetBoard;
        this.onWin = onWin;
    }

    getGridCell(row, col) {
        return document.getElementById(`cell_${row}${col}`);
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
        if (this.board === this.targetBoard) {
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
    }
}
