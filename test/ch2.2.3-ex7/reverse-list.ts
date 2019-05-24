import test from "ava";
import { makeLinkedList } from "../../ch2.2.3-ex7/linked-list";
import { reverseLinkedList } from "../../ch2.2.3-ex7/reverse-linked-list";

test("reversing an empty list is an empty list", (t): void => {
    let emptyList = makeLinkedList();
    t.deepEqual(reverseLinkedList(emptyList), emptyList);
});

test("reversing a short list gives the expected result", (t): void => {
    let input = makeLinkedList(1, 2, 3);
    let expectedOutput = makeLinkedList(3, 2, 1);
    t.deepEqual(reverseLinkedList(input), expectedOutput);
});

test("reversing a very long list does not cause a stack overflow", (t): void => {
    const LENGTH = 10_000;
    let longAscendingArray = Array.from(
        { length: LENGTH },
        (x, i): number => i,
    );
    let input = makeLinkedList(...longAscendingArray);
    let longDescendingArray = Array.from(
        { length: LENGTH },
        (x, i): number => LENGTH - i - 1,
    );
    let expectedOutput = makeLinkedList(...longDescendingArray);
    t.deepEqual(reverseLinkedList(input), expectedOutput);
});
