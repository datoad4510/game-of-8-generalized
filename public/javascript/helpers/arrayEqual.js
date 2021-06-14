/**
 *
 * @param {Array.<any>} arr1
 * @param {Array.<any>} arr2
 */
export function arrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let index = 0; index < arr1.length; index++) {
        if (arr1[index] !== arr2[index]) return false;
    }

    return true;
}
