import { Board } from "./classes/board.js";
import { gridController as controller } from "./classes/gridController.js";
import { addMovementButtons } from "./view/movementButtons.js";
import { generateGrid } from "./view/generateGrid.js";
import { node } from "./classes/decisionTree/treeNode.js";

// TODO: maybe make grid into a class. gridController won't need to implement getCell and setCell
// TODO: pass ai to service worker

window.onload = async () => {
    // make a 3x3 board
    const board = new Board(4, 4);
    board.shuffleBoardSol(5);
    const targetBoard = new Board(4, 4);

    // make a grid from the board and add it to the DOM
    const gridContainer = document.getElementById("grid-container");
    const initialGridContainer = document.getElementById(
        "initial-grid-container"
    );
    const targetGridContainer = document.getElementById(
        "target-grid-container"
    );

    const grid = generateGrid(board);

    gridContainer.append(grid);
    initialGridContainer.append(generateGrid(new Board(-1, -1, board)));
    targetGridContainer.append(generateGrid(targetBoard));

    // spawn a grid controller to control the spawned board
    const gridController = new controller(grid, board, targetBoard, onWin, {
        name: "bfs",
        maxIterationCount: 300000,
    });

    // add movement buttons and hook up gridController to them
    addMovementButtons(gridController);

    await gridController.getAnswer();
    console.log(gridController.optimalPath);
};

function onWin() {
    document
        .getElementById("grid-container")
        .append((document.createElement("span").innerText = "you won!"));
}
