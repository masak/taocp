import { Operation } from "../ch2.2.1-ex2/operations";
import { opsToPerm } from "../ch2.2.1-ex2/operations-to-permutation";

export function sequenceIsAdmissible(sequence: Operation[]): boolean {
    try {
        opsToPerm(sequence);
        return true;
    } catch {
        return false;
    }
}
