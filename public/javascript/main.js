import { addEventListeners } from "./view/addFunctionality.js";

// TODO: maybe make grid into a class. gridController won't need to implement getCell and setCell
// TODO: add a way to see the solution
// TODO: add mobile friendly buttons
// TODO: push to heroku
// ! remove not working ! event listeners not being removed, old boards are in memory and are being manipulated
// ! by buttons. make named functions for events and remove using them

window.onload = async () => {
    await addEventListeners();
};
