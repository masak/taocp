interface LinkedList<T> {
    first: ListNode<T>;
}

interface ListNode<T> {
    info: T;
    link: ListNode<T> | NullLink;
}

enum NullLink { NULL }
const Λ = NullLink.NULL;

let linkedList: LinkedList<number> = {
    first: {
        info: 1,
        link: {
            info: 2,
            link: {
                info: 3,
                link: {
                    info: 4,
                    link: {
                        info: 5,
                        link: Λ,
                    },
                },
            },
        },
    },
};

// Reverses a linked list _in place_; that is, returns the same
// list object, but with its elements reversed. The `first` link
// now points to the element that used to be _last_, and all the
// other links between the nodes have been inverted.
//
// The example linked list above represents the list (1, 2, 3, 4, 5).
// Reversing this list would turn it into (5, 4, 3, 2, 1).
function reverseLinkedList<T>(list: LinkedList<T>): LinkedList<T> {
    // TODO: write unit tests
    // TODO: implement
    return list;
}