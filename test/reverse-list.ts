import test from 'ava';
import { makeLinkedList } from '../linked-list';
import { reverseLinkedList } from '../reverse-linked-list';

test('reversing an empty list is an empty list', t => {
    let emptyList = makeLinkedList();
    t.deepEqual(reverseLinkedList(emptyList), emptyList);
});

test.failing('reversing a short list gives the expected result', t => {
    let input = makeLinkedList(1, 2, 3);
    let expectedOutput = makeLinkedList(3, 2, 1);
    t.deepEqual(reverseLinkedList(input), expectedOutput);
});