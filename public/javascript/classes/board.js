import { shuffleArray } from "../helpers/arrayShuffler.js";
import { range } from "../helpers/rangeGenerator.js";

export class Board {
    /**
     *
     * @param {int} rows number of rows
     * @param {int} cols number of columns
     * @param {Board} other_board board to copy
     */
    constructor(rows, cols, other_board) {
        if (typeof other_board === "undefined") {
            // creating a new board
            this.rows = rows;
            this.cols = cols;
            this.board = range(0, rows * cols - 1);
            this.zeroPosition = { row: 0, col: 0 };
        } else {
            // copying another board into this board
            this.rows = other_board.rows;
            this.cols = other_board.cols;
            this.board = other_board.board;
            this.zeroPosition = other_board.zeroPosition;
        }
    }

    getValue(row, col) {
        return this.board[this.cols * row + col];
    }

    setValue(row, col, value) {
        this.board[this.cols * row + col] = value;
    }

    swapValues(row1, col1, row2, col2) {
        const firstVal = this.getValue(row1, col1);
        const secondVal = this.getValue(row2, col2);

        this.setValue(row1, col1, secondVal);
        this.setValue(row2, col2, firstVal);
    }

    findZero() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.getValue(row, col) === 0)
                    this.zeroPosition = { row: row, col: col };
            }
        }
    }

    shuffleBoard() {
        shuffleArray(this.board);
        this.findZero();
    }

    // moving 0 in the board, if at edge dont do anything
    moveBoard(direction) {
        console.log(direction);
        const directions = {
            up: [-1, 0],

            right: [0, 1],

            down: [1, 0],

            left: [0, -1],
        };

        const offset = directions[direction];

        // check out of bounds
        if (
            this.zeroPosition.row + offset[0] < 0 ||
            this.zeroPosition.row + offset[0] >= this.rows ||
            this.zeroPosition.col + offset[1] < 0 ||
            this.zeroPosition.col + offset[1] >= this.cols
        )
            return false;

        // make a move
        this.swapValues(
            this.zeroPosition.row,
            this.zeroPosition.col,
            this.zeroPosition.row + offset[0],
            this.zeroPosition.col + offset[1]
        );

        // update zeroPosition
        this.zeroPosition.row += offset[0];
        this.zeroPosition.col += offset[1];

        return true;
    }
}
