import { addEventListeners } from "./view/addFunctionality.js";

// TODO: maybe make grid into a class. gridController won't need to implement getCell and setCell
// TODO: add mobile friendly buttons
// TODO: push to heroku

window.onload = async () => {
    await addEventListeners();
};
