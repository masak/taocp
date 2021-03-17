import { Operation } from "../ex2/operations";

export function sequenceIsAdmissible(sequence: Operation[]): boolean {
    let stackSize = 0;
    return (
        sequence.every(
            (op): boolean => (stackSize += op === Operation.S ? +1 : -1) >= 0,
        ) && !stackSize
    );
}
