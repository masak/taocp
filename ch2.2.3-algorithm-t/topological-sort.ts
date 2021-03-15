type Relation = [number, number];

enum NullLink {
    NULL,
}
const Λ = NullLink.NULL;

interface Successor {
    suc: number;
    next: Successor | NullLink;
}

export class OutOfBounds extends Error {}

export class PartialHypothesisViolation extends Error {}

// Algorithm T (Topological sort). This algorithm inputs pairs of relations j ≺ k,
// indicating that object j precedes object k in a certain partial ordering, assuming
// that 1 ≤ j, k ≤ n. The output is the set of n objects embedded in linear order.
// The internal tables used are: QLINK[0], COUNT[1] = QLINK[1], COUNT[2] =
// QLINK[2], ..., COUNT[n] = QLINK[n]; TOP[1], TOP[2], ..., TOP[n]; a storage
// pool with one node for each input relation and with SUC and NEXT fields as shown
// above; P, a link variable used to refer to the nodes of the storage pool; F and R,
// integer-valued variables used to refer to the front and rear of a queue whose links
// are in the QLINK table; and N, a variable that counts how many objects have yet
// to be output.
export function topologicalSort(
    n: number,
    inputRelations: Relation[],
): number[] {
    // T1. [Initialize.] Input the value of n. Set COUNT[k] ← 0 and TOP[k] ← Λ for
    //     1 ≤ k ≤ n. Set N ← n.
    let count: number[] = Array.from({ length: n + 1 });
    for (let k = 1; k <= n; k++) {
        count[k] = 0;
    }
    let top: (Successor | NullLink)[] = Array.from(
        { length: n + 1 },
        (): NullLink => Λ,
    );
    let N = n;

    // T2. [Next relation.] Get the next relation "j ≺ k" from the input; if the input
    //     has been exhausted, however, go to T4.
    for (let [j, k] of inputRelations) {
        if (k < 1 || k > n)
            throw new OutOfBounds(
                `The number ${k} provided in a relation is out of bounds (1..${n})`,
            );
        if (j < 1 || j > n)
            throw new OutOfBounds(
                `The number ${j} provided in a relation is out of bounds (1..${n})`,
            );

        // T3. [Record the relation.] Increase COUNT[k] by one. Set
        //
        //            P ⇐ AVAIL, SUC(P) ← k, NEXT(P) ← TOP[j], TOP[j] ← P
        //
        //     (This is operation (8).) Go back to T2.
        count[k]++;
        top[j] = {
            suc: k,
            next: top[j],
        };
    }

    // T4. [Scan for zeros.] (At this point we have completed the input phase; the input
    //     (18) would now have been transformed into the computer representation
    //     shown in Fig. 8. The next job is to initialize the queue of output, which
    //     is linked together in the QLINK field.) Set R ← 0 and QLINK[0] ← 0. For
    //     1 ≤ k ≤ n examine COUNT[k], and if it is zero, set QLINK[R] ← k and
    //     R ← k. After this has been done for all k, set F ← QLINK[0] (which will
    //     contain the first value k encountered for which COUNT[k] was zero.)
    let R = 0;
    let qlink: number[] = count;
    qlink[0] = 0;
    for (let k = 1; k <= n; k++) {
        if (count[k] === 0) {
            qlink[R] = k;
            R = k;
        }
    }
    let F: number = qlink[0];

    let output: number[] = [];
    let P: Successor | NullLink;
    while (true) {
        // T5. [Output front of queue.] Output the value of F. If F = 0, go to T8; otherwise
        //     set N ← N - 1, and set P ← TOP[F]. (Since the QLINK and COUNT tables
        //     overlap, we have QLINK[R] = 0; therefore the condition F = 0 occurs when
        //     the queue is empty.)
        output.push(F);
        // [masak] We could easily move this conditional break before the .push and avoid
        // emitting a 0 at the end -- in fact, we could make it `while (F !== 0)` --
        // but we choose to stick close to the spirit of the original algorithm. In JavaScript,
        // we always know the length of an Array, so a final 0 to indicate end of output is
        // not strictly necessary.
        if (F === 0) {
            break;
        }

        N--;
        P = top[F];

        // T6. [Erase relations.] If P = Λ, go to T7. Otherwise decrease COUNT[SUC(P)]
        //     by one, and if it has thereby gone down to zero, set QLINK[R] ← SUC(P)
        //     and R ← SUC(P). Set P ← NEXT(P) and repeat this step. (We are removing
        //     all relations of the form "F ≺ k" for some k from the system, and putting
        //     new nodes into the queue when all their predecessors have been output.)
        while (P !== Λ) {
            if (--count[P.suc] === 0) {
                R = qlink[R] = P.suc;
            }
            P = P.next;
        }

        // T7. [Remove from queue.] Set F ← QLINK[F] and go back to T5.
        F = qlink[F];
    }

    // T8. [End of process.] The algorithm terminates. If N = 0, we have output all of
    //     the object numbers in the desired "topological order", followed by a zero.
    //     Otherwise the N object numbers not yet output contain a loop, in violation
    //     of the hypothesis of partial order. (See exercise 23 for an algorithm that
    //     prints out the contents of one such loop.) ■
    if (N !== 0) {
        throw new PartialHypothesisViolation(
            "Violation of the hypothesis of partial order",
        );
    }
    return output;
}
