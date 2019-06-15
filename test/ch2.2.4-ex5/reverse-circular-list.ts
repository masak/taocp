import test from "ava";
import { makeCircularList } from "../../ch2.2.4-ex5/circular-list";
import { reverseCircularList } from "../../ch2.2.4-ex5/reverse-circular-list";

test("reversing an empty circular list returns an empty list ", (t): void => {
    let list = makeCircularList();
    t.deepEqual(reverseCircularList(list), list);
});

test("reversing a short circular list gives the expected result", (t): void => {
    let list = makeCircularList(1,2,3);
    let expectedResult = makeCircularList(3,2,1);
    t.deepEqual(reverseCircularList(list), expectedResult);
});

