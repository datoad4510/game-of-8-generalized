// for hashing arrays and comparing by value
export class arrayHashSet extends Set {
    add(arr) {
        super.add(arr.toString());
    }
    has(arr) {
        return super.has(arr.toString());
    }
}