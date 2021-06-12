import { generateGrid } from "./generateGrid.js";

// add grid to the DOM
export function addGrid(board) {
    const gridContainer = document.getElementById("grid-container");

    // generate board in html
    gridContainer.append(generateGrid(board));
}
