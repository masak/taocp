import test from 'ava';
import { Λ, reverseLinkedList } from '../invert-linked-list';

test('reversing an empty list is an empty list', t => {
    t.deepEqual(reverseLinkedList({ first: Λ }), { first: Λ });
});