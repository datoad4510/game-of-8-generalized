// ends included
export const range = (start, end) => {
    return new Array(end - start + 1).fill().map((val, idx) => start + idx);
};
