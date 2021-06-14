import { gridController } from "../classes/gridController.js";

/**
 *
 * @param {gridController} gridController
 */
export function addMovement(gridController) {
    const moveUpBtn = document.createElement("button");
    moveUpBtn.innerText = "Up";
    moveUpBtn.className = "movement-button";
    moveUpBtn.addEventListener("click", () => {
        gridController.moveGrid("up");
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "KeyW" || e.code === "ArrowUp")
            gridController.moveGrid("up");
    });

    const moveRightBtn = document.createElement("button");
    moveRightBtn.innerText = "Right";
    moveRightBtn.className = "movement-button";

    moveRightBtn.addEventListener("click", () => {
        gridController.moveGrid("right");
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "KeyD" || e.code === "ArrowRight")
            gridController.moveGrid("right");
    });

    const moveDownBtn = document.createElement("button");
    moveDownBtn.innerText = "Down";
    moveDownBtn.className = "movement-button";

    moveDownBtn.addEventListener("click", () => {
        gridController.moveGrid("down");
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "KeyS" || e.code === "ArrowDown")
            gridController.moveGrid("down");
    });

    const moveLeftBtn = document.createElement("button");
    moveLeftBtn.innerText = "Left";
    moveLeftBtn.className = "movement-button";
    moveLeftBtn.addEventListener("click", () => {
        gridController.moveGrid("left");
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "KeyA" || e.code === "ArrowLeft")
            gridController.moveGrid("left");
    });

    const resetBtn = document.createElement("button");
    resetBtn.innerText = "Reset";
    resetBtn.className = "movement-button";
    resetBtn.addEventListener("click", () => {
        gridController.resetGrid();
    });

    const gridContainer = document.getElementById("grid-container");

    gridContainer.append(
        moveUpBtn,
        moveRightBtn,
        moveDownBtn,
        moveLeftBtn,
        resetBtn
    );
}
