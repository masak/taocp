import { CircularList, ListNode, Λ } from "./circular-list";

// Reverses a circular list _in place_; that is, returns the same
// circular list object, but with its elements reversed:
//
// * The `ptr` link (which originally pointed to the "rightmost"/"last"
//   element in the circular list) now points to the node that used to
//   be its successor (but that is now its predecessor).
// * All the links between the nodes have been inverted, making successors
//   predecessors and vice versa.
//
// For example, the circular list (1, 2, 3, 4, 5), after being reversed,
// would have the order (5, 4, 3, 2, 1). Note that in both cases, the
// rightmost element links back to the leftmost one.
//
// Here is an algorithm for the function, written in the style of
// TAoCP:
//
//     Algorithm C (Invert a circular linked list). The circular list in L
//     will be reversed in place.
//
//     C1. [Empty list?] If PTR[L] = Λ, end the algorithm.
//
//     C2. [Initialize] Set P ← PTR[L], and set all three of PTR[L], S, and
//         C to LINK[P].
//
//     C3. [Point link backwards] Set N ← LINK[C], LINK[C] ← P, P ← C,
//         C ← N. Repeat this step until C = S. ■
export function reverseCircularList<T>(list: CircularList<T>): CircularList<T> {
    if (list.ptr !== Λ) {
        let previousNode: ListNode<T> = list.ptr;
        let startingPoint = (list.ptr = previousNode.link);
        let currentNode = startingPoint;
        do {
            let nextNode = currentNode.link;
            currentNode.link = previousNode;
            [previousNode, currentNode] = [currentNode, nextNode];
        } while (currentNode != startingPoint);
    }
    return list;
}
