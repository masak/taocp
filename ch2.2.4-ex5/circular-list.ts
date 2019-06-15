export interface CircularList<T> {
    ptr: ListNode<T> | NullLink;
}

export interface ListNode<T> {
    info: T;
    link: ListNode<T>;
}

interface ProtoCircularList<T> {
    ptr: ProtoListNode<T> | NullLink;
}

interface ProtoListNode<T> {
    info: T;
    link: ProtoListNode<T> | NullLink;
}

export enum NullLink {
    NULL,
}
export const Λ = NullLink.NULL;

// Builds a circular list from a set of values. Just a convenience
// function so that we don't have to write the object literals out.
export function makeCircularList<T>(...values: T[]): CircularList<T> {
    if (values.length === 0) {
        return { ptr: Λ };
    }
    let last!: ProtoListNode<T>;
    let unjoinedCircularList: ProtoCircularList<T> = {
        ptr: values.reduceRight(
            (
                nextNode: ProtoListNode<T> | NullLink,
                info: T,
            ): ProtoListNode<T> | NullLink =>
                (last = last || {
                    info,
                    link: nextNode,
                }),
            Λ, // overwritten below
        ),
    };
    let first = unjoinedCircularList.ptr;
    last.link = first;
    let circularList: CircularList<T> = unjoinedCircularList as CircularList<T>;
    return circularList;
}
