import test from "ava";
import { Operation } from "../../ch2.2.1-ex2/operations";
import {
    opsToPerm,
    CannotPopEmptyStack,
} from "../../ch2.2.1-ex2/operations-to-permutation";

const S = Operation.S;
const X = Operation.X;

test("letting through one train car", (t): void => {
    t.deepEqual([1], opsToPerm([S, X]));
});

test("cannot pop an empty stack", (t): void => {
    t.throws((): number[] => opsToPerm([X]), CannotPopEmptyStack);

    t.throws((): number[] => opsToPerm([S, X, X]), CannotPopEmptyStack);
});
