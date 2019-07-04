import { LinkedList, ListNode, NullLink, Λ } from "./linked-list";

// Reverses a linked list _in place_; that is, returns the same
// list object, but with its elements reversed. The `first` link
// now points to the element that used to be _last_, and all the
// other links between the nodes have been inverted.
//
// Here is an algorithm for the function, written in the style of
// TAoCP:
//
//     Algorithm I (Invert a linked list). The linked list in L will be
//     reversed in place.
//
//     I1. [Initialize] Set P ← Λ, C ← FIRST[L].
//
//     I2. [End of list?] If C is Λ, go to I4.
//
//     I3. [Point link backwards] Set N ← LINK[C], LINK[C] ← P, P ← C,
//         C ← N. Go back to I2.
//
//     I4. [Point first node] Set FIRST[L] ← P. ■
export function reverseLinkedList<T>(list: LinkedList<T>): LinkedList<T> {
    let previousNode: ListNode<T> | NullLink = Λ;
    let nextNode: ListNode<T> | NullLink;
    for (
        let node: ListNode<T> | NullLink = list.first;
        node !== Λ;
        [previousNode, node] = [node, nextNode]
    ) {
        nextNode = node.link;
        node.link = previousNode;
    }
    list.first = previousNode;
    return list;
}
