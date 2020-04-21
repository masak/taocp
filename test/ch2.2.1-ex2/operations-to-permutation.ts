import test from "ava";
import { Operation } from "../../ch2.2.1-ex2/operations";
import {
    opsToPerm,
    CannotPopEmptyStack,
    CarsLeftOnStack,
} from "../../ch2.2.1-ex2/operations-to-permutation";

const S = Operation.S;
const X = Operation.X;

test("letting through one train car", (t): void => {
    t.deepEqual([1], opsToPerm([S, X]));
});

test("cannot pop an empty stack", (t): void => {
    t.throws<CannotPopEmptyStack>((): number[] => opsToPerm([X]));

    t.throws<CannotPopEmptyStack>((): number[] => opsToPerm([S, X, X]));
});

test("letting through two train cars", (t): void => {
    t.deepEqual([1, 2], opsToPerm([S, X, S, X]));
});

test("stacking cars; output in reverse", (t): void => {
    t.deepEqual([2, 1], opsToPerm([S, S, X, X]));
    t.deepEqual([3, 2, 1], opsToPerm([S, S, S, X, X, X]));
    t.deepEqual([1, 3, 2], opsToPerm([S, X, S, S, X, X]));
});

test("example 1/3 from the exercise", (t): void => {
    t.deepEqual([2, 4, 3, 1], opsToPerm([S, S, X, S, S, X, X, X]));
});

test("example 2/3 from the exercise", (t): void => {
    t.deepEqual(
        [3, 2, 5, 6, 4, 1],
        opsToPerm([S, S, S, X, X, S, S, X, S, X, X, X]),
    );
});

test("cars left on the stack", (t): void => {
    t.throws<CarsLeftOnStack>((): number[] => opsToPerm([S]));
    t.throws<CarsLeftOnStack>((): number[] => opsToPerm([S, X, S]));
    t.throws<CarsLeftOnStack>((): number[] => opsToPerm([S, S, X]));
});
