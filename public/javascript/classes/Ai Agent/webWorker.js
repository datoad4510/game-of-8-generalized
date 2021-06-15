// importScripts("../board.js", "agent.js");
import { Board } from "../board.js";
import { Agent } from "./agent.js";

onmessage = function (e) {
    // unpack data
    const receivedMessage = [...e.data];

    // initialize data
    const rows = receivedMessage[0];
    const cols = receivedMessage[1];
    const board = receivedMessage[2];
    const targetBoard = receivedMessage[3];
    const boardObj = new Board(rows, cols, board);
    const targetBoardObj = new Board(rows, cols, targetBoard);
    const algorithm = receivedMessage[4];
    const maxIterationCount = receivedMessage[5];
    // create agent from data
    const agent = new Agent(
        boardObj,
        targetBoardObj,
        algorithm,
        maxIterationCount
    );
    // run heavy computation
    const workerResult = agent.run();

    // send back data
    postMessage(workerResult);
};
