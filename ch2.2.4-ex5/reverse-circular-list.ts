import { CircularList, ListNode, NullLink, Λ } from "./circular-list";

export function reverseCircularList<T>(list: CircularList<T>): CircularList<T> {

    let openedList = Object.assign({ first: list.ptr }, { link: Λ });
    let lastLink = list.ptr;
    let previousNode: ListNode<T> | NullLink = Λ;
    let nextNode: ListNode<T> | NullLink;
    for (
        let node: ListNode<T> | NullLink = openedList.first;
        node !== Λ;
        [previousNode, node] = [node, nextNode]
    ) {
        nextNode = node.link;
        node.link = previousNode;
    }

    openedList.first = lastLink;

    let newCircularList = { ptr: openedList.first } as CircularList<T>;
    return newCircularList;
}
