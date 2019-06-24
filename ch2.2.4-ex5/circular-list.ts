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

function isProtoListNode<T>(
    n: ProtoListNode<T> | NullLink,
): n is ProtoListNode<T> {
    return n !== Λ;
}

// Builds a circular list from a set of values. Just a convenience
// function so that we don't have to write the object literals out.
export function makeCircularList<T>(...values: T[]): CircularList<T> {
    let rightmostNode: ProtoListNode<T> | NullLink = Λ;
    let leftmostNode: ProtoListNode<T> | NullLink = values.reduceRight(
        (
            nextNode: ProtoListNode<T> | NullLink,
            info: T,
        ): ProtoListNode<T> | NullLink => {
            let newNode = {
                info,
                link: nextNode,
            };
            rightmostNode = rightmostNode === Λ ? newNode : rightmostNode;
            return newNode;
        },
        Λ, // overwritten below
    );
    // At this point, `rightmostNode`, if it was ever set, will have
    // its .link pointing to Λ. We want it to instead point to `leftmostNode`.
    if (isProtoListNode(rightmostNode)) {
        rightmostNode.link = leftmostNode;
    }
    return {
        ptr: rightmostNode,
    };
}
