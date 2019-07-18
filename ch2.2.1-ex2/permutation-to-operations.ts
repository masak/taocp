export enum Operation {
    S = "S",
    X = "X",
}

export class NotAPermutation extends Error {}

export class CannotOutputInOriginalOrder extends Error {
    public firstNumber: number;
    public secondNumber: number;
    public previousHighNumber: number;

    public constructor(
        firstNumber: number,
        secondNumber: number,
        previousHighNumber: number,
    ) {
        super();
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.previousHighNumber = previousHighNumber;
    }
}

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
    let stack = [];
    for (let number of inputPermutation) {
        while (number >= nextCarFromInput) {
            outputOperations.push(Operation.S);
            stack.push(nextCarFromInput);
            nextCarFromInput++;
        }
        let stackTop = stack[stack.length - 1];
        if (number !== stackTop) {
            throw new CannotOutputInOriginalOrder(
                number,
                stackTop,
                nextCarFromInput - 1,
            );
        }
        outputOperations.push(Operation.X);
        stack.pop();
    }
    return outputOperations;
}
