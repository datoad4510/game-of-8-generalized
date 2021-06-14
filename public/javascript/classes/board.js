import { arrayEqual } from "../helpers/arrayEqual.js";
import { shuffleArray } from "../helpers/arrayShuffler.js";
import { arrayShufflerHasSolution } from "../helpers/arrayShufflerHasSolution.js";
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
            this.board = [...other_board.board];
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

    // what move gets us from this board to the parameter board
    /**
     *
     * @param {Board} nextBoard the board that we want to get with one move from current board
     * @returns
     */
    whatMove(nextBoard) {
        // directions and their reverses
        const moves = [
            ["left", "right"],
            ["right", "left"],
            ["up", "down"],
            ["down", "up"],
        ];

        for (const move of moves) {
            const direction = move[0];
            const reverse = move[1];

            // if such a move is valid, consider it
            if (this.moveBoard(direction)) {
                if (arrayEqual(this.board, nextBoard)) {
                    // move board into the original position
                    this.moveBoard(reverse);

                    return direction;
                }
                this.moveBoard(reverse);
            }
        }

        return "ERR";
    }

    shuffleBoard() {
        shuffleArray(this.board);
        this.findZero();
    }

    shuffleBoardSol(iterationNum) {
        arrayShufflerHasSolution(
            this.board,
            this.rows,
            this.cols,
            iterationNum
        );
        this.findZero();
    }

    // moving 0 in the board, if at edge dont do anything
    /**
     *
     * @param {string} direction "up","right","down","left"
     * @returns boolean false if out of bounds, else true
     */
    moveBoard(direction) {
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
        ) {
            // out of bounds
            return false;
        }

        // make a move
        this.swapValues(
            this.zeroPosition.row,
            this.zeroPosition.col,
            this.zeroPosition.row + offset[0],
            this.zeroPosition.col + offset[1]
        );

        // update zeroPosition
        this.findZero();

        return true;
    }
}
