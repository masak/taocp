import test from "ava";
import {
    Operation,
    NotAPermutation,
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
