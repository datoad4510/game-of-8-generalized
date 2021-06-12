import { node } from "../decisionTree/treeNode.js";

/**
 *
 * @param {node} node1
 * @param {node} node2
 */
function heuristic(node1, node2) {
    // count differences between boards
    const brd1 = node1.board;
    const brd2 = node2.board;

    let differences = 0;
    for (let row = 0; row < brd1.rows; rows++) {
        for (let col = 0; col < brd1.cols; col++) {
            if (brd1.getValue(row, col) !== brd2.getValue(row, col))
                ++differences;
        }
    }

    return differences;
}

/**
 *
 * @param {node} node
 */
function cost(node) {
    return node.pathCost;
}

/**
 *
 * @param {node} node1
 * @param {node} node2
 */
export function costEstimate(node1, node2) {
    // estimation of the path cost from root to node2.
    // equal to cost from root to node1 + approximation from node1 to node2 (heuristic)
    return cost(node1) + heuristic(node1, node2);
}
