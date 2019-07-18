export enum Operation {
    S = "S",
    X = "X",
}

export class NotAPermutation extends Error {}

// Returns `true` iff the array is some permutation of [1, 2, ..., n], n >= 1
function isPermutation(array: number[]): boolean {
    return (
        array.length > 0 &&
        array.every((_, i): boolean => array.includes(i + 1))
    );
}

export function permToOps(inputPermutation: number[]): Operation[] {
    if (!isPermutation(inputPermutation)) {
        throw new NotAPermutation();
    }

    let outputOperations = [];
    let nextCarFromInput = 1;
    for (let number of inputPermutation) {
        while (number >= nextCarFromInput) {
            outputOperations.push(Operation.S);
            nextCarFromInput++;
        }
        outputOperations.push(Operation.X);
    }
    return outputOperations;
}
