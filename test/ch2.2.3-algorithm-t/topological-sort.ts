import test from "ava";
import {
    topologicalSort,
    PartialHypothesisViolation,
    OutOfBounds,
} from "../../ch2.2.3-algorithm-t/topological-sort";

test("topologically sorting zero elements", (t): void => {
    t.deepEqual(topologicalSort(0, []), [0]);
});

test("topologically sorting a single element", (t): void => {
    t.deepEqual(topologicalSort(1, []), [1, 0]);
});

test("topologically sorting two elements", (t): void => {
    t.deepEqual(topologicalSort(2, [[1, 2]]), [1, 2, 0]);
    t.deepEqual(topologicalSort(2, [[2, 1]]), [2, 1, 0]);
});

test("violating the hypothesis about partial order", (t): void => {
    t.throws((): number[] => topologicalSort(1, [[1, 1]]), {
        instanceOf: PartialHypothesisViolation,
    });
    t.throws((): number[] => topologicalSort(2, [[2, 2]]), {
        instanceOf: PartialHypothesisViolation,
    });
    t.throws(
        (): number[] =>
            topologicalSort(2, [
                [2, 1],
                [1, 2],
            ]),
        { instanceOf: PartialHypothesisViolation },
    );
});

test("giving relations that are out of bounds", (t): void => {
    t.throws((): number[] => topologicalSort(2, [[1, 3]]), {
        instanceOf: OutOfBounds,
    });
    t.throws((): number[] => topologicalSort(2, [[1, 0]]), {
        instanceOf: OutOfBounds,
    });
    t.throws((): number[] => topologicalSort(2, [[3, 2]]), {
        instanceOf: OutOfBounds,
    });
    t.throws((): number[] => topologicalSort(2, [[-1, 2]]), {
        instanceOf: OutOfBounds,
    });
});

test("the example from page 264 in the book", (t): void => {
    t.deepEqual(
        topologicalSort(9, [
            [9, 2],
            [3, 7],
            [7, 5],
            [5, 8],
            [8, 6],
            [4, 6],
            [1, 3],
            [7, 4],
            [9, 5],
            [2, 8],
        ]),
        [1, 9, 3, 2, 7, 4, 5, 8, 6, 0],
    );
});
