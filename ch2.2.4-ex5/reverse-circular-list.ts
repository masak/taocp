import { CircularList, ListNode, Λ } from "./circular-list";

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
