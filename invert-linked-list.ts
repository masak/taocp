interface LinkedList<T> {
    first: ListNode<T>;
}

interface ListNode<T> {
    info: T;
    link: ListNode<T> | NullLink;
}

enum NullLink { NULL }