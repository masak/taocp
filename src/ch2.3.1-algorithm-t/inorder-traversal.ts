import { BinaryTree, BinaryNode, Λ } from "./binary-tree";

// Traverses a binary tree in _inorder_, that is, visits every node
// after visiting its left subtree but before visiting its right subtree.
export function traverse<T>(t: BinaryTree<T>, visit: (n: BinaryNode<T>) => void): void {
    // T1
    let stack: BinaryNode<T>[] = [];
    let p: BinaryTree<T> = t;
    while (true) {
        // T2
        while (p !== Λ) {
            // T3 (Now `p` points to a binary node that is to be traversed.)
            stack.push(p);
            p = p.llink;
        }
        // T4
        if (stack.length === 0) {
            return;
        }
        let node = stack.pop()!;
        // T5
        visit(node);
        p = node.rlink;
    }
}
