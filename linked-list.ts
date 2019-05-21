export interface LinkedList<T> {
    first: ListNode<T> | NullLink;
}

export interface ListNode<T> {
    info: T;
    link: ListNode<T> | NullLink;
}

export enum NullLink { NULL }
export const Λ = NullLink.NULL;

// Builds a linked list from a set of values. Just a convenience
// function so that we don't have to write the object literals out.
export function makeLinkedList<T>(...values: T[]): LinkedList<T> {
    return {
        first: values.reduceRight(
            (nextNode: ListNode<T> | NullLink, info: T) => ({ info, link: nextNode }),
            Λ
        ),
    };
}