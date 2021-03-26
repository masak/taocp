export interface CircularList<T> {
    ptr: ListNode<T> | NullLink;
}

export interface ListNode<T> {
    info: T;
    link: ListNode<T>;
}

export enum NullLink {
    NULL,
}
export const Λ = NullLink.NULL;

function nodePointingToItself<T>(info: T): ListNode<T> {
    let node = { info, link: (Λ as any) as ListNode<T> };
    node.link = node;

    return node;
}

// Builds a circular list from a set of values. Just a convenience
// function so that we don't have to write the object literals out.
export function makeCircularList<T>(...values: T[]): CircularList<T> {
    if (values.length === 0) {
        return { ptr: Λ };
    }

    let rightmostNode = nodePointingToItself(values[values.length - 1]);

    let leftmostNode = values.slice(0, values.length - 1).reduceRight(
        (nextNode: ListNode<T>, info: T): ListNode<T> => ({
            info,
            link: nextNode,
        }),
        rightmostNode,
    );

    rightmostNode.link = leftmostNode;

    return {
        ptr: rightmostNode,
    };
}
