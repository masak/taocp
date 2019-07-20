import { Operation } from "../ch2.2.1-ex2/operations";

export function sequenceIsAdmissible(sequence: Operation[]): boolean {
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
                    return false;
                }
                break;
        }
    }

    return !stack.length;
}
