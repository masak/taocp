export interface BinaryNode<T> {
    info: T;
    llink: BinaryTree<T>;
    rlink: BinaryTree<T>;
}

export enum NullLink {
    NULL,
}
export const Λ = NullLink.NULL;

export type BinaryTree<T> = BinaryNode<T> | NullLink;

type ATree<T> = [] | [T] | [ATree<T>, T, ATree<T>];

function isNull<T>(n: ATree<T>): n is [] {
    return n.length === 0;
}

function isLeafNode<T>(n: ATree<T>): n is [T] {
    return n.length === 1;
}

// "Parses" a tree from an array specification, such as this one:
//
// [[["D"], "B", []], "A", [[[], "E", ["G"]], "C", [["H"], "F", ["J"]]]]
//
// Each array either has one element, in which it represents a leaf node,
// or three elements [leftTree, info, rightTree]. The resulting tree would
// look like this:
//
//       A
//      . .
//     .   .
//    B     C
//   .     . .
//  .     .   .
// D     E     F
//        .   . .
//         G H   J
//
// Note that, incidentally, the elements in the input format occur in inorder.
export function makeBinaryTree<T>(treeInput: ATree<T>): BinaryTree<T> {
    if (isNull(treeInput)) {
        return Λ;
    }
    else if (isLeafNode(treeInput)) {
        let [info] = treeInput;
        return { info, llink: Λ, rlink: Λ };
    }
    else {
        let [left, info, right] = treeInput;
        return {
            info,
            llink: makeBinaryTree(left),
            rlink: makeBinaryTree(right),
        };
    }
}
