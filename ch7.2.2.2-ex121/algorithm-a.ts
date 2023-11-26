let L = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    9, 7, 3, 8, 7, 5, 6, 5, 3, 8,
    4, 3, 8, 6, 2, 9, 6, 4, 7, 4,
    2,
];

let F = [
    0, 0, 30, 21, 29, 17, 26, 28, 22, 25,
    9, 7, 3, 8, 11, 5, 6, 15, 12, 13,
    4, 18, 19, 16, 2, 10, 23, 20, 14, 27,
    24,
];

let B = [
    0, 0, 24, 12, 20, 15, 16, 11, 13, 10,
    25, 14, 18, 19, 28, 17, 23, 5, 21, 22,
    27, 3, 8, 26, 30, 9, 6, 29, 7, 4,
    2,
];

let C = [
    0, 0, 2, 3, 3, 2, 3, 3, 3, 2,
    7, 7, 7, 6, 6, 6, 5, 5, 5, 4,
    4, 4, 3, 3, 3, 2, 2, 2, 1, 1,
    1,
];

let starts = [28, 25, 22, 19, 16, 13, 10];

let sizes = [3, 3, 3, 3, 3, 3, 3];

interface ClauseTable {
    m: number;
    L: number[];
    F: number[];
    B: number[];
    C: number[];
    starts: number[];
    sizes: number[];
}

// m: number of clauses
// n: number of variables
function satisfy({ m, L, F, B, C, starts, sizes }: ClauseTable): number[] | null {
    // A1. [Initialize]
    // a: number of active clauses
    let a = m;
    // d: depth-plus-one in an implicit search tree
    let d = 1;
    let moves = new Array(m).fill(0);

    let state = 2;
    let l: number;
    while (true) {
        switch (state) {
            case 2: {
                // A2. [Choose]
                l = 2 * d;
                if (C[l] <= C[l + 1]) {
                    l = l + 1;
                }
                // `moves` is using zero-based indexes in this implementation
                moves[d - 1] = (l & 1) + 4 * (C[l ^ 1] == 0 ? 1 : 0);
                // Terminate successfully if C[l] == a
                if (C[l] == a) {
                    return moves.slice(0, d);
                }
                state = 3;
                break;
            }
            case 3: {
                // A3. [Remove l-negated]
                let lNegated = l! ^ 1;
                let p = F[lNegated];
                while (p != lNegated) {
                    // zero-based, so subtracting 1
                    let clause = C[p] - 1;
                    if (--sizes[clause] == 0) {
                        break;
                    }
                    p = F[p];
                }
                if (p == lNegated) {
                    state = 4;
                }
                else {
                    // If we are here, we found a clause that would have been made empty, and so we
                    // need to backtrack. we put everything back the way it was before we started
                    // the above `while` loop.
                    while (p != lNegated) {
                        let clause = C[p] - 1;
                        ++sizes[clause];
                        p = B[p];
                    }
                    state = 5;
                }
                break;
            }
            case 4: {
                // A4. [Deactivate l's clauses]
                let p = F[l!];
                while (p != l!) {
                    let clause = C[p] - 1;
                    for (let i = starts[clause]; i < p; i++) {
                        F[B[i]] = F[i];
                        B[F[i]] = B[i];
                        C[L[i]] -= 1;
                    }
                    p = F[p];
                }
                a -= C[l];
                d += 1;
                state = 2;
                break;
            }
            case 5: {
                // A5. [Try again]
                if (moves[d - 1] < 2) {
                    moves[d - 1] = 3 - moves[d - 1];
                    l = 2 * d + (moves[d - 1] & 1);
                    state = 3;
                }
                else {
                    state = 6;
                }
                break;
            }
            case 6: {
                // A6. [Backtrack]
                if (d == 1) {
                    return null;
                }
                d -= 1;
                l = 2 * d + (moves[d - 1] & 1);
                state = 7;
                break;
            }
            case 7: {
                // A7. [Reactivate l's clauses]
                a += C[l!];
                let p = B[l!];
                while (p != l!) {
                    let clause = C[p] - 1;
                    for (let i = p - 1; i >= starts[clause]; i--) {
                        C[L[i]] += 1;
                        B[F[i]] = i;
                        F[B[i]] = i;
                    }
                    p = B[p];
                }
                state = 8;
                break;
            }
            case 8: {
                // A8. [Unremove l-overbar]
                let lNegated = l! ^ 1;
                let p = B[lNegated];
                while (p != lNegated) {
                    // zero-based, so subtracting 1
                    let clause = C[p] - 1;
                    ++sizes[clause];
                    p = B[p];
                }
                state = 5;
                break;
            }
        }
    }
}

let clauseTable = { m: 7, L, F, B, C, starts, sizes };
console.log(satisfy(clauseTable));
