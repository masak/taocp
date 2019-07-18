import { Operation } from "./operations";

export class CannotPopEmptyStack extends Error {}

export function opsToPerm(operations: Operation[]): number[] {
    let nextCarNumber = 1;
    let permutation: number[] = [];
    let stack: number[] = [];

    for (let op of operations) {
        switch (op) {
            case Operation.S:
                stack.push(nextCarNumber);
                nextCarNumber++;
                break;
            case Operation.X:
                let number = stack.pop();
                if (typeof number === "undefined") {
                    throw new CannotPopEmptyStack();
                }
                permutation.push(number);
                break;
        }
    }

    return permutation;
}
