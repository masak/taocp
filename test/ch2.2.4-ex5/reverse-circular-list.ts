import test from "ava";
import { makeCircularList } from "../../ch2.2.4-ex5/circular-list";
import { reverseCircularList } from "../../ch2.2.4-ex5/reverse-circular-list";

test("reversing an empty list is an empty list", (t): void => {
    let emptyList = makeCircularList();
    t.deepEqual(reverseCircularList(emptyList), emptyList);
});

test("reversing a one-element list gives the same list", (t): void => {
    let singletonList = makeCircularList(1);
    t.deepEqual(reverseCircularList(singletonList), singletonList);
});

test("reversing a short list gives the expected result", (t): void => {
    let input = makeCircularList(1, 2, 3);
    let expectedOutput = makeCircularList(3, 2, 1);
    t.deepEqual(reverseCircularList(input), expectedOutput);
});
