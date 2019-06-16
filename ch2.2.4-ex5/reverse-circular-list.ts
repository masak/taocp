import { CircularList, ListNode, NullLink, Λ } from "./circular-list";

export function reverseCircularList<T>(list: CircularList<T>): CircularList<T> {

    if(list.ptr === undefined) return list;

    let lastLink: ListNode<T>  = list.ptr.link;
    let previousNode: ListNode<T>;
    let nextNode: ListNode<T>;
    let lastRealLink: ListNode<T>;

    for (
        let node: ListNode<T> = list.ptr.link;
        node !== lastLink;
        [nextNode, node] = [node, previousNode]
    ) {
        nextNode = node.link;
        node.link = previousNode;
        previousNode = node;
        lastRealLink = previousNode;
    }
    list.ptr.link = lastRealLink;
    
    return list;
}
