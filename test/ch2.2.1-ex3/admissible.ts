import test from "ava";
import { Operation } from "../../src/ch2.2.1-ex2/operations";
import { sequenceIsAdmissible } from "../../src/ch2.2.1-ex3/admissible";

const S = Operation.S;
const X = Operation.X;

test("letting through one train car", (t): void => {
    t.true(sequenceIsAdmissible([S, X]));
});

test("cannot pop an empty stack", (t): void => {
    t.false(sequenceIsAdmissible([X]));
    t.false(sequenceIsAdmissible([S, X, X]));
});

test("letting through two train cars", (t): void => {
    t.true(sequenceIsAdmissible([S, X, S, X]));
});

test("stacking cars; output in reverse", (t): void => {
    t.true(sequenceIsAdmissible([S, S, X, X]));
    t.true(sequenceIsAdmissible([S, S, S, X, X, X]));
    t.true(sequenceIsAdmissible([S, X, S, S, X, X]));
});

test("example 1/3 from the exercise", (t): void => {
    t.true(sequenceIsAdmissible([S, S, X, S, S, X, X, X]));
});

test("example 2/3 from the exercise", (t): void => {
    t.true(sequenceIsAdmissible([S, S, S, X, X, S, S, X, S, X, X, X]));
});

test("cars left on the stack", (t): void => {
    t.false(sequenceIsAdmissible([S]));
    t.false(sequenceIsAdmissible([S, X, S]));
    t.false(sequenceIsAdmissible([S, S, X]));
});
