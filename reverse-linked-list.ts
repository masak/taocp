import { LinkedList, ListNode, NullLink, Λ } from "./linked-list";

// Reverses a linked list _in place_; that is, returns the same
// list object, but with its elements reversed. The `first` link
// now points to the element that used to be _last_, and all the
// other links between the nodes have been inverted.
//
// The example linked list above represents the list (1, 2, 3, 4, 5).
// Reversing this list would turn it into (5, 4, 3, 2, 1).
export function reverseLinkedList<T>(list: LinkedList<T>): LinkedList<T> {
    let previousNode: ListNode<T> | NullLink = Λ;
    let nextNode: ListNode<T> | NullLink;
    for (
        let node: ListNode<T> | NullLink = list.first;
        node !== Λ;
        node = nextNode
    ) {
        nextNode = node.link;
        node.link = previousNode;
        previousNode = node;
    }
    list.first = previousNode;
    return list;
}
