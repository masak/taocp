import test from "ava";
import {
    Operation,
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
    t.throws(
        (): Operation[] => permToOps([]),
        NotAPermutation,
        "Permutation can't be empty",
    );

    t.throws(
        (): Operation[] => permToOps([2, 3]),
        NotAPermutation,
        "Permutation can't be missing numbers",
    );

    t.throws(
        (): Operation[] => permToOps([1, 1]),
        NotAPermutation,
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
            "Can't output 1 then 2; these were stacked in order to output 3",
        );
    }
});
