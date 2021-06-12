import { Board } from "./classes/board.js";
import { gridController as controller } from "./classes/gridController.js";
import { addMovementButtons } from "./view/movementButtons.js";
import { addGrid } from "./view/addGrid.js";

window.onload = () => {
    // make a 3x3 board
    const board = new Board(3, 3);
    const targetBoard = new Board(3, 3);
    targetBoard.shuffleBoard();
    console.log(targetBoard);

    // make a grid from the board and add it to the DOM
    addGrid(board);

    // spawn a grid controller to control the spawned board
    const gridController = new controller(board, targetBoard, onWin);

    // add movement buttons and hook up gridController to them
    addMovementButtons(gridController);
};

function onWin() {
    document
        .getElementById("grid-container")
        .append((document.createElement("span").innerText = "you won!"));
}
