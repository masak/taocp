export interface CircularList<T> {
    ptr: ListNode<T> | NullLink;
}

export interface ListNode<T> {
    info: T;
    link: ListNode<T>;
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
    let rightmostNode: ProtoListNode<T> | undefined = undefined;
    let leftmostNode: ProtoListNode<T> | NullLink = values.reduceRight(
        (
            nextNode: ProtoListNode<T> | NullLink,
            info: T,
        ): ProtoListNode<T> | NullLink => {
            let newNode = {
                info,
                link: nextNode,
            };
            rightmostNode = rightmostNode || newNode;
            return newNode;
        },
        Λ, // overwritten below
    );
    // At this point, `rightmostNode`, if it was ever set, will have
    // its .link pointing to Λ. We want it to instead point to `leftmostNode`.
    if (rightmostNode) {
        (rightmostNode as ProtoListNode<T>).link = leftmostNode;
    }
    return {
        // The below conversion is now valid because there is no Λ
        ptr: (rightmostNode as unknown) as ListNode<T>,
    };
}

