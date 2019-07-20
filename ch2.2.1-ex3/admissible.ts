import { Operation } from "../ch2.2.1-ex2/operations";
import {
    CannotPopEmptyStack,
    CarsLeftOnStack,
} from "../ch2.2.1-ex2/operations-to-permutation";

export function sequenceIsAdmissible(sequence: Operation[]): boolean {
    try {
        let nextCarNumber = 1;
        let stack: number[] = [];

        for (let op of sequence) {
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
                    break;
            }
        }

        if (stack.length) {
            throw new CarsLeftOnStack();
        }

        return true;
    } catch {
        return false;
    }
}
