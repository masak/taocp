import test from "ava";
import { Operation } from "../../ch2.2.1-ex2/operations";
import {
    NotAPermutation,
    CannotOutputInOriginalOrder,
    permToOps,
} from "../../ch2.2.1-ex2/permutation-to-operations";

const S = Operation.S;
const X = Operation.X;

test("letting through one train car", (t): void => {
    t.deepEqual([S, X], permToOps([1]));
});

test("not a permutation", (t): void => {
    t.throws<NotAPermutation>(
        (): Operation[] => permToOps([]),
        null,
        "Permutation can't be empty",
    );

    t.throws<NotAPermutation>(
        (): Operation[] => permToOps([2, 3]),
        null,
        "Permutation can't be missing numbers",
    );

    t.throws<NotAPermutation>(
        (): Operation[] => permToOps([1, 1]),
        null,
        "Permutation can't have duplicates",
    );
});

test("letting through two train cars", (t): void => {
    t.deepEqual([S, X, S, X], permToOps([1, 2]));
});

test("stacking cars; output in reverse", (t): void => {
    t.deepEqual([S, S, X, X], permToOps([2, 1]));
    t.deepEqual([S, S, S, X, X, X], permToOps([3, 2, 1]));
    t.deepEqual([S, X, S, S, X, X], permToOps([1, 3, 2]));
});

test("example 1/3 from the exercise", (t): void => {
    t.deepEqual([S, S, X, S, S, X, X, X], permToOps([2, 4, 3, 1]));
});

test("example 2/3 from the exercise", (t): void => {
    t.deepEqual(
        [S, S, S, X, X, S, S, X, S, X, X, X],
        permToOps([3, 2, 5, 6, 4, 1]),
    );
});

test("can't output stacked cars in original order", (t): void => {
    try {
        permToOps([3, 1, 2]);
        t.fail("should've thrown an exception");
    } catch (ex) {
        if (!(ex instanceof CannotOutputInOriginalOrder)) {
            throw ex;
        }
        t.is(ex.firstNumber, 1);
        t.is(ex.secondNumber, 2);
        t.is(ex.previousHighNumber, 3);
        t.is(
            ex.toString(),
            "Can't output 1 then 2; the former was stacked in order to output 3",
        );
    }
});

test("example 3/3 from the exercise", (t): void => {
    try {
        permToOps([1, 5, 4, 6, 2, 3]);
        t.fail("should've thrown an exception");
    } catch (ex) {
        if (!(ex instanceof CannotOutputInOriginalOrder)) {
            throw ex;
        }
        t.is(ex.firstNumber, 2);
        t.is(ex.secondNumber, 3);
        t.is(ex.previousHighNumber, 5);
        t.is(
            ex.toString(),
            "Can't output 2 then 3; the former was stacked in order to output 5",
        );
    }
});
