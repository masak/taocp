import test from 'ava';
import { makeLinkedList } from '../linked-list';
import { reverseLinkedList } from '../reverse-linked-list';

test('reversing an empty list is an empty list', (t): void => {
    let emptyList = makeLinkedList();
    t.deepEqual(reverseLinkedList(emptyList), emptyList);
});

test('reversing a short list gives the expected result', (t): void => {
    let input = makeLinkedList(1, 2, 3);
    let expectedOutput = makeLinkedList(3, 2, 1);
    t.deepEqual(reverseLinkedList(input), expectedOutput);
});
