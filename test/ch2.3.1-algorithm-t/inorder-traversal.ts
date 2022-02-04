import test from "ava";
import { makeBinaryTree, BinaryNode } from "../../src/ch2.3.1-algorithm-t/binary-tree";
import { traverse } from "../../src/ch2.3.1-algorithm-t/inorder-traversal";

test("traversal of an empty binary tree", (t): void => {
    let emptyTree = makeBinaryTree([]);
    let order: any[] = [];
    traverse(emptyTree, (n) => order.push(n.info));
    t.deepEqual(order, []);
});

test("traversal of a left-leaning tree", (t): void => {
    let leftLeaningTree = makeBinaryTree<string>([[[["A"], "B", []], "C", []], "D", []]);
    let order: string[] = [];
    traverse(leftLeaningTree, (n: BinaryNode<string>) => order.push(n.info));
    t.deepEqual(order, ["A", "B", "C", "D"]);
});

test("traversal of a right-leaning tree", (t): void => {
    let rightLeaningTree = makeBinaryTree<string>([[], "A", [[], "B", [[], "C", ["D"]]]]);
    let order: string[] = [];
    traverse(rightLeaningTree, (n: BinaryNode<string>) => order.push(n.info));
    t.deepEqual(order, ["A", "B", "C", "D"]);
});

test("traversal of the tree from figure (1)", (t): void => {
    let tree = makeBinaryTree<string>([[["D"], "B", []], "A", [[[], "E", ["G"]], "C", [["H"], "F", ["J"]]]]);
    let order: string[] = [];
    traverse(tree, (n: BinaryNode<string>) => order.push(n.info));
    t.deepEqual(order, ["D", "B", "A", "E", "G", "C", "H", "F", "J"]);
});

