export function arrayShufflerHasSolution(array, rows, cols, iterationNum) {
    for (let iteration = 0; iteration < iterationNum; ++iteration) {
        let zeroPosition = array.indexOf(0);

        // convert index to coordinates
        let [row, col] = getCoords(zeroPosition);

        makeRandomMove(array, row, col, rows, cols);
    }

    function getCoords(index) {
        const row = Math.floor(index / cols);
        const col = index - cols * row;
        return [row, col];
    }

    function getValue(array, row, col) {
        return array[cols * row + col];
    }

    function setValue(array, row, col, value) {
        array[cols * row + col] = value;
    }

    function swapValues(array, row1, col1, row2, col2) {
        const firstVal = getValue(array, row1, col1);
        const secondVal = getValue(array, row2, col2);

        setValue(array, row1, col1, secondVal);
        setValue(array, row2, col2, firstVal);
    }

    function makeRandomMove(array, zeroRow, zeroCol, rows, cols) {
        const directions = [
            [-1, 0],

            [0, 1],

            [1, 0],

            [0, -1],
        ];
        const validDirections = [];

        for (const direction of directions) {
            const offset = direction;

            if (
                zeroRow + offset[0] < 0 ||
                zeroRow + offset[0] >= rows ||
                zeroCol + offset[1] < 0 ||
                zeroCol + offset[1] >= cols
            ) {
                // out of bounds
                continue;
            } else {
                validDirections.push(direction);
            }
        }

        const randomValidOffset =
            validDirections[Math.floor(Math.random() * validDirections.length)];
        // make a move
        swapValues(
            array,
            zeroRow,
            zeroCol,
            zeroRow + randomValidOffset[0],
            zeroCol + randomValidOffset[1]
        );
    }
}
