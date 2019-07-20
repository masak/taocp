import { Operation } from "./operations";

/** In general, an array of integers is not a permutation of 1..n. For when it
 *  isn't, we throw this exception, because the algorithm works under the
 *  assumption that the input is such a permutation.
 */
export class NotAPermutation extends Error {}

/** Cars sometimes get put on the stack in order to immediately be emitted, but
 *  much of the time they get put on the stack in order to emit some higher-
 *  numbered car. In this latter case, because the stack is a stack, we're only
 *  able to emit the cars in the opposite (LIFO) order they were stacked.
 *  This exception signals that an attempt was made to emit some cars in the
 *  (FIFO) order they were stacked.
 */
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

    public toString(): string {
        return `Can't output ${this.firstNumber} then ${
            this.secondNumber
        }; the former was stacked in order to output ${
            this.previousHighNumber
        }`;
    }
}

/** Returns whether the array is some permutation of [1, 2, ..., n], n >= 1. */
function isPermutation(array: number[]): boolean {
    return (
        array.length > 0 &&
        array.every((_, i): boolean => array.includes(i + 1))
    );
}

/** Given a permutation, returns a sequence of stack operations (if any) that
 *  will yield that permutation.
 *
 *  For example: (2 3 4 1) results in `SSXSXSXX`.
 *
 *  If the input is malformed somehow, throws `NotAPermutation`.
 *
 *  The following explains the algorithm in all its generality: the next number
 *  we want to emit is either:
 *
 *  - The next number in the input, in which case we just stack it and emit it
 *    immediately.
 *
 *  - Higher than the next number in the input, in which case we need to stack
 *    all the numbers up to the expected one, and then emit that. (The lower
 *    numbers remain on the stack.)
 *
 *  - Lower than the next number in the input. We can't have emitted it yet,
 *    since the input is a permutation. Instead, the number must be on the
 *    stack. X is our only emitting operation, so we can only emit the top of
 *    the stack. If we try to emit anything else, the function throws
 *    `CannotOutputInOriginalOrder`.
 */
export function permToOps(inputPermutation: number[]): Operation[] {
    if (!isPermutation(inputPermutation)) {
        throw new NotAPermutation();
    }

    let outputOperations = [];
    let nextCarFromInput = 1;
    let stack = [];
    let stackingReason = new Map<number, number>();
    for (let number of inputPermutation) {
        // CASE I(a): The number we're to output is the next one from the input.
        //            In this case we go through the below loop once, and we're
        //            guaranteed success afterwards. No net change to the stack.
        // CASE I(b): The number we're to output is higher than the next one
        //            from the input. In this case we need to stack all the
        //            numbers we're not ready to output yet. They'll be stacked
        //            so they need to be output in reverse (LIFO) order later.
        while (number >= nextCarFromInput) {
            outputOperations.push(Operation.S);
            stack.push(nextCarFromInput);
            stackingReason.set(nextCarFromInput, number);
            nextCarFromInput++;
        }
        let stackTop = stack[stack.length - 1];
        // CASE II(a): The number we're to output is somewhere in the stack, but
        //             not on top. This in the only thing we can't do, and we
        //             need to throw an exception rather than continue. This
        //             happens when cars were stacked in I(b) earlier, and now
        //             they're requested in some non-LIFO order.
        if (number !== stackTop) {
            throw new CannotOutputInOriginalOrder(
                number,
                stackTop,
                stackingReason.get(number) as number,
            );
        }
        // CASE II(b): The number we're to output is on the top of the stack.
        //             Either because we're coming directly from case I(a), or
        //             because things were stacked in a previous iterations's
        //             step I(b), and they're now being requested in a LIFO
        //             order.
        outputOperations.push(Operation.X);
        stack.pop();
    }
    return outputOperations;
}
