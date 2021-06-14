import { Board } from "../board.js";
export class node {
    /**
     *
     * @param {Board} board how the board looks in this node
     * @param {node} parent parent node
     * @param {Array.<node>} children child nodes of this node
     */
    constructor(board, parent) {
        this.board = new Board(-1, -1, board);
        this.parent = parent;
        this.pathCost = 0;

        // in our case, depth === pathCost, since edges in the tree
        // all have weight 1
        this.depth = 0;
    }

    // creates valid child nodes
    getChildren() {
        let children = [];

        const moves = [
            ["left", "right"],
            ["right", "left"],
            ["up", "down"],
            ["down", "up"],
        ];

        for (const move of moves) {
            const direction = move[0];
            const reverse = move[1];

            if (this.board.moveBoard(direction)) {
                const child_node = new node(
                    new Board(-1, -1, this.board),
                    this
                );
                child_node.depth = this.depth + 1;
                child_node.pathCost = this.pathCost + this.edgeCost(child_node);
                children.push(child_node);

                this.board.moveBoard(reverse);
            }
        }

        this.children = children;

        return children;
    }

    // get path from root to this node
    getPathFromRoot() {
        let path = [];
        path.push(this);

        let current_parent = this.parent;
        while (current_parent !== null) {
            path.push(current_parent);

            current_parent = current_parent.parent;
        }

        // path is node to root. to get root to node, reverse it
        return path.reverse();
    }

    // edge cost from this node to its child or parent
    edgeCost(node) {
        // 1 for out problem
        return 1;
    }
}
