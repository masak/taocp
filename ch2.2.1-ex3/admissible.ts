import { Operation } from "../ch2.2.1-ex2/operations";

export function sequenceIsAdmissible(sequence: Operation[]): boolean {
    let stackSize = 0;

    for (let op of sequence) {
        if ((stackSize += op === Operation.S ? +1 : -1) < 0) {
            return false;
        }
    }

    return !stackSize;
}
