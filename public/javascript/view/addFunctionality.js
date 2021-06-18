import { Board } from "../classes/board.js";
import { generateGrid } from "./generateGrid.js";
import { gridController as controller } from "../classes/gridController.js";
import { addMovement } from "./movement.js";

// this will hold event listeners that will be deleted when "again" is pressed
let eventListeners = [];

function checkboxEventListener() {
    const difficultyCheckbox = document.getElementById("isRandom");

    difficultyCheckbox.addEventListener("click", () => {
        const difficultyNumber = document.getElementById("difficulty");

        difficultyNumber.classList.toggle("display-none");
    });
}

function againEventListener() {
    const endContainer = document.getElementById("end-container");
    const againButton = document.getElementById("again");

    againButton.addEventListener("click", () => {
        endContainer.classList.toggle("display-none");
        const optionsContainer = document.getElementById("options-container");
        optionsContainer.classList.toggle("display-none");
    });
}

function onWin() {
    const grids = document.querySelectorAll(".grid");
    grids.forEach((grid) => {
        grid.remove();
    });
    const buttons = document.querySelectorAll(".movement-button");

    eventListeners.forEach((listener) => {
        document.removeEventListener("keydown", listener);
    });
    buttons.forEach((button) => {
        button.remove();
    });
    const listItems = document.querySelectorAll("#solution-list li");
    listItems.forEach((item) => {
        item.remove();
    });
    document.getElementById("game-container").classList.toggle("display-none");
    document.getElementById("end-container").classList.toggle("display-none");
}

async function createGrid(rows, cols, isRandom, difficulty) {
    // make a 3x3 board
    const board = new Board(rows, cols);
    if (isRandom) {
        board.shuffleBoard();
    } else {
        board.shuffleBoardSol(difficulty);
    }
    const targetBoard = new Board(rows, cols);

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
        maxIterationCount: 500000,
    });

    // add movement buttons and hook up gridController to them
    eventListeners = addMovement(gridController);

    await gridController.getAnswer();
}

function startEventListener() {
    const startButton = document.getElementById("start-button");

    startButton.addEventListener("click", () => {
        // get options
        const rows = document.getElementById("rows").value;
        const cols = document.getElementById("cols").value;
        const isRandom = document.getElementById("isRandom").checked;
        const difficulty = document.getElementById("difficulty").value;

        // hide options menu
        const optionsContainer = document.getElementById("options-container");
        optionsContainer.classList.toggle("display-none");

        createGrid(rows, cols, isRandom, difficulty);

        const gameContainer = document.getElementById("game-container");
        gameContainer.classList.toggle("display-none");
    });
}

export function addEventListeners() {
    checkboxEventListener();
    againEventListener();
    startEventListener();
}
