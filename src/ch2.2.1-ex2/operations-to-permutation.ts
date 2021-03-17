import { Operation } from "./operations";

/** If at any point in the sequence of operations passed to `opsToPerm` we have
 *  seen more Xs than Ss, this translates to popping an empty stack. That's not
 *  permissible, and so the sequence of operations as a whole is inadmissible.
 */
export class CannotPopEmptyStack extends Error {}

/** If the sequence of operations contains fewer Xs than Ss when it ends, cars
 *  are still left on the stack, which is not in good taste and hence not
 *  allowed. (You're allowed only to stack cars which you later unstack.) Thanks
 *  to this exception, if a sequence of operations is returned, it will always
 *  have as many Ss as it has Xs.
 */
export class CarsLeftOnStack extends Error {}

/** Interprets a sequence of operations and gives back the permutation that
 * results.
 *
 * For example: `SSXSXSXX` results in (2 3 4 1).
 *
 * The interpretation can result in `CannotPopEmptyStack` or `CarsLeftOnStack`
 * (which see) if the sequence of operations does not conform to our
 * expectations.
 */
export function opsToPerm(operations: Operation[]): number[] {
    let nextCarNumber = 1;
    let permutation: number[] = [];
    let stack: number[] = [];

    for (let op of operations) {
        switch (op) {
            case Operation.S:
                stack.push(nextCarNumber);
                nextCarNumber++;
                break;
            case Operation.X:
                let number = stack.pop();
                if (typeof number === "undefined") {
                    throw new CannotPopEmptyStack();
                }
                permutation.push(number);
                break;
        }
    }

    if (stack.length) {
        throw new CarsLeftOnStack();
    }

    return permutation;
}
