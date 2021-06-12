import { Board } from "../classes/board.js";

/**
 *
 * @param {Board} board - the board to draw
 */
export function generateGrid(board) {
    const grid = document.createElement("div");

    const zeroPosition = board.zeroPosition;

    for (let row = 0; row < board.rows; row++) {
        for (let col = 0; col < board.cols; col++) {
            const cell = document.createElement("div");
            cell.id = `cell_${row}${col}`;

            // leave 0 empty
            if (zeroPosition.row !== row || zeroPosition.col !== col)
                cell.innerText = board.getValue(row, col);

            grid.appendChild(cell);
        }
    }

    grid.id = "grid";
    grid.style.gridTemplateRows = `repeat(${board.rows},1fr)`;
    grid.style.gridTemplateColumns = `repeat(${board.cols},1fr)`;
    grid.style.width = "fit-content";
    grid.style.display = "grid";

    return grid;
}
