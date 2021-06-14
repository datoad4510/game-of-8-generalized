import { startEventListener } from "./view/addFunctionality.js";

// TODO: maybe make grid into a class. gridController won't need to implement getCell and setCell

window.onload = async () => {
    await startEventListener();
};


