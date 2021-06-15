import { gridController } from "../classes/gridController.js";

/**
 *
 * @param {gridController} gridController
 */
export function addMovement(gridController) {
    function upHandler(e) {
        if (e.code === "KeyW" || e.code === "ArrowUp") {
            gridController.moveGrid("up");
        }
    }
    function rightHandler(e) {
        if (e.code === "KeyD" || e.code === "ArrowRight")
            gridController.moveGrid("right");
    }
    function downHandler(e) {
        if (e.code === "KeyS" || e.code === "ArrowDown")
            gridController.moveGrid("down");
    }
    function leftHandler(e) {
        if (e.code === "KeyA" || e.code === "ArrowLeft")
            gridController.moveGrid("left");
    }
    function resetHandler(e) {
        gridController.resetGrid();
    }
    function solutionHandler(e) {
        const solution = gridController.optimalPath;
        const solutionList = document.querySelectorAll("#solution-list li");
        if (solution.length !== 0 && solutionList.length === 0) {
            const solutionContainer = document.getElementById("solution-list");
            solution.forEach((step) => {
                const listItem = document.createElement("li");
                listItem.innerText = step;
                solutionContainer.append(listItem);
            });
        }
    }

    const moveUpBtn = document.createElement("button");
    moveUpBtn.innerText = "Up";
    moveUpBtn.className = "movement-button";
    moveUpBtn.addEventListener("click", () => {
        gridController.moveGrid("up");
    });
    document.addEventListener("keydown", upHandler);

    const moveRightBtn = document.createElement("button");
    moveRightBtn.innerText = "Right";
    moveRightBtn.className = "movement-button";

    moveRightBtn.addEventListener("click", () => {
        gridController.moveGrid("right");
    });
    document.addEventListener("keydown", rightHandler);

    const moveDownBtn = document.createElement("button");
    moveDownBtn.innerText = "Down";
    moveDownBtn.className = "movement-button";

    moveDownBtn.addEventListener("click", () => {
        gridController.moveGrid("down");
    });
    document.addEventListener("keydown", downHandler);

    const moveLeftBtn = document.createElement("button");
    moveLeftBtn.innerText = "Left";
    moveLeftBtn.className = "movement-button";
    moveLeftBtn.addEventListener("click", () => {
        gridController.moveGrid("left");
    });

    document.addEventListener("keydown", leftHandler);

    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset";
    resetBtn.className = "movement-button";
    resetBtn.addEventListener("click", resetHandler);

    const solutionBtn = document.createElement("button");
    solutionBtn.innerText = "Get Solution";
    solutionBtn.className = "movement-button";
    solutionBtn.addEventListener("click", solutionHandler);

    const gridContainer = document.getElementById("grid-container");

    gridContainer.append(
        moveUpBtn,
        moveRightBtn,
        moveDownBtn,
        moveLeftBtn,
        resetBtn,
        solutionBtn
    );

    return [
        upHandler,
        rightHandler,
        downHandler,
        leftHandler,
        resetHandler,
        solutionHandler,
    ];
}
