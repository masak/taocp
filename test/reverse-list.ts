import test from 'ava';
import { LinkedList, Λ, reverseLinkedList } from '../invert-linked-list';

test('reversing an empty list is an empty list', t => {
    t.deepEqual(reverseLinkedList({ first: Λ }), { first: Λ });
});

test('reversing a short list gives the expected result', t => {
    let input: LinkedList<number> = {
        first: {
            info: 1,
            link: {
                info: 2,
                link: {
                    info: 3,
                    link: Λ,
                },
            },
        },
    };
    let expectedOutput: LinkedList<number> = {
        first: {
            info: 3,
            link: {
                info: 2,
                link: {
                    info: 1,
                    link: Λ,
                },
            },
        },
    };
    t.deepEqual(reverseLinkedList(input), expectedOutput);
});