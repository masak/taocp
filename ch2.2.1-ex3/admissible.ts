import { Operation } from "../ch2.2.1-ex2/operations";

export function sequenceIsAdmissible(sequence: Operation[]): boolean {
    let stackSize = 0;

    for (let op of sequence) {
        switch (op) {
            case Operation.S:
                stackSize += 1;
                break;
            case Operation.X:
                stackSize -= 1;
                if (stackSize < 0) {
                    return false;
                }
                break;
        }
    }

    return !stackSize;
}
