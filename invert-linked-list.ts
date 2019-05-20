export interface LinkedList<T> {
    first: ListNode<T> | NullLink;
}

interface ListNode<T> {
    info: T;
    link: ListNode<T> | NullLink;
}

enum NullLink { NULL }
export const Λ = NullLink.NULL;

// Builds a linked list from a set of values. Just a convenience
// function so that we don't have to write the object literals out.
export function makeLinkedList<T>(...values: T[]): LinkedList<T> {
    let firstNode: ListNode<T> | NullLink = Λ;
    let currentNode: ListNode<T>;
    for (let value of values) {
        if (firstNode === Λ) {
            firstNode = {
                info: value,
                link: Λ,
            };
            currentNode = firstNode;
        }
        else {
            currentNode.link = {
                info: value,
                link: Λ,
            };
            currentNode = currentNode.link;
        }
    }
    return {
        first: firstNode,
    };
}

// Reverses a linked list _in place_; that is, returns the same
// list object, but with its elements reversed. The `first` link
// now points to the element that used to be _last_, and all the
// other links between the nodes have been inverted.
//
// The example linked list above represents the list (1, 2, 3, 4, 5).
// Reversing this list would turn it into (5, 4, 3, 2, 1).
export function reverseLinkedList<T>(list: LinkedList<T>): LinkedList<T> {
    // TODO: implement
    return list;
}