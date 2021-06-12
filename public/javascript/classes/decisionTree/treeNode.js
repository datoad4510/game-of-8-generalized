import { Board } from "../board.js";
export class node {
    /**
     *
     * @param {Board} board how the board looks in this node
     * @param {node} parent parent node
     * @param {Array.<node>} children child nodes of this node
     */
    constructor(board, parent, children) {
        this.board = board;
        this.parent = parent;
        this.children = children;
        this.pathCost = 0;

        // in our case, depth === pathCost, since edges in the tree
        // all have weight 1
        this.depth = 0;
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

    // create the decision tree
    // createTree(depth = 0) {
    //     // boards of children
    //     let boards = [];

    //     // copying this board (there are no pointers and operator overloading in javascript)
    //     // also make sure that we are not moving to an already seen
    //     let moveLeftBoard = new Board(-1, -1, this.board);
    //     if (moveLeftBoard.moveLeft()) {
    //         if (moveLeftBoard !== this.board) boards.push(moveLeftBoard);
    //     }

    //     let moveRightBoard = new Board(-1, -1, this.board);
    //     if (moveRightBoard.moveRight()) {
    //         boards.push(moveRightBoard);
    //     }

    //     let moveUpBoard = new Board(-1, -1, this.board);
    //     if (moveUpBoard.moveUp()) {
    //         boards.push(moveUpBoard);
    //     }

    //     let moveDownBoard = new Board(-1, -1, this.board);
    //     if (moveDownBoard.moveDown()) {
    //         boards.push(moveDownBoard);
    //     }

    //     // fill children of this node
    //     for (let index = 0; index < boards.length; index++) {
    //         const child_board = boards[index];

    //         const child_node = new node(child_board, this, []);
    //         child_node.depth = depth + 1;

    //         // recursively fill children of child
    //         child_node.createTree(depth + 1);

    //         // append to children
    //         this.children.push(child_node);
    //     }
    // }
}
