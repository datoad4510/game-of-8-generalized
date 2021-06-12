/**
 *
 * @param {controller} gridController
 */
export function addMovementButtons(gridController) {
    const moveUpBtn = document.createElement("button");
    moveUpBtn.innerText = "Up";
    moveUpBtn.addEventListener("click", () => {
        gridController.moveGrid("up");
    });

    const moveRightBtn = document.createElement("button");
    moveRightBtn.innerText = "Right";
    moveRightBtn.addEventListener("click", () => {
        gridController.moveGrid("right");
    });

    const moveDownBtn = document.createElement("button");
    moveDownBtn.innerText = "Down";
    moveDownBtn.addEventListener("click", () => {
        gridController.moveGrid("down");
    });

    const moveLeftBtn = document.createElement("button");
    moveLeftBtn.innerText = "Left";
    moveLeftBtn.addEventListener("click", () => {
        gridController.moveGrid("left");
    });

    const gridContainer = document.getElementById("grid-container");

    gridContainer.append(moveUpBtn, moveRightBtn, moveDownBtn, moveLeftBtn);
}
