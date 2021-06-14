// importScripts("../board.js", "agent.js");
import { Board } from "../board.js";
import { Agent } from "./agent.js";

onmessage = function (e) {
    console.log("Message received from main script");
    const receivedMessage = [...e.data];
    const rows = receivedMessage[0];
    const cols = receivedMessage[1];
    const board = receivedMessage[2];
    const targetBoard = receivedMessage[3];
    const boardObj = new Board(rows, cols, board);
    const targetBoardObj = new Board(rows, cols, targetBoard);
    const algorithm = receivedMessage[4];
    const maxIterationCount = receivedMessage[5];
    const agent = new Agent(
        boardObj,
        targetBoardObj,
        algorithm,
        maxIterationCount
    );
    const workerResult = agent.run();
    console.log("Posting message back to main script");
    postMessage(workerResult);
};
