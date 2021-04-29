interface Literal {
    n: number;
    isPositive: boolean;
}

function variable(n: number): [Literal, Literal] {
    return [
        { n, isPositive: true },
        { n, isPositive: false },
    ];
}

function variables(n: number): Array<[Literal, Literal]> {
    let result: Array<[Literal, Literal]> = [];
    for (let i = 1; i <= n; i++) {
        result.push(variable(i));
    }
    return result;
}

let [[p1, n1], [p2, n2], [p3, n3], [p4, n4]] = variables(4);

type Clause = Array<Literal>;
type Formula = Array<Clause>;

let R: Array<Clause> = [
    [p1, p2, n3],
    [p2, p3, n4],
    [p3, p4, p1],
    [p4, n1, p2],
    [n1, n2, p3],
    [n2, n3, p4],
    [n3, n4, n1],
];

interface ClauseTable {
    m: number;
    L: number[];
    F: number[];
    B: number[];
    C: number[];
    starts: number[];
    sizes: number[];
}

interface Cell {
    literal: Literal | null;
    headerIndex: number;
    backLink: Cell | null;
    forwardLink: Cell | null;
    cc: number;
    index: number;
}

type Comparator<T> = (a: T, b: T) => number;
type Projection<T> = (x: T) => number;

function by<T>(...projections: Array<Projection<T>>): Comparator<T> {
    return (a: T, b: T) => {
        for (let p of projections) {
            let pA = p(a);
            let pB = p(b);
            let comparison = pA < pB
                ? -1
                : pA > pB
                    ? +1
                    : 0;
            if (comparison != 0) {
                return comparison;
            }
        }
        return 0;
    };
}

function emptyCell(): Cell {
    return {
        literal: null,
        headerIndex: 0,
        backLink: null,
        forwardLink: null,
        cc: 0,
        index: 0,
    };
}

function flatMap<T, U>(array: Array<T>, fn: (t: T) => Array<U>): Array<U> {
    let result: Array<U> = [];
    for (let t of array) {
        result = [...result, ...fn(t)];
    }
    return result;
}

function buildClauseTable(F: Formula): ClauseTable {
    let m = F.length;
    let cells: Array<Cell> = [emptyCell(), emptyCell()];
    let n = Math.max(...flatMap(F, (clause) => clause.map((literal) => literal.n)));
    for (let i = 1; i <= n; i++) {
        let positiveLiteralCell: Cell = {
            literal: { n: i, isPositive: true },
            headerIndex: 0,
            backLink: null,
            forwardLink: null,
            cc: 0,
            index: 2 * i,
        };
        positiveLiteralCell.backLink = positiveLiteralCell;
        positiveLiteralCell.forwardLink = positiveLiteralCell;
        cells.push(positiveLiteralCell);

        let negativeLiteralCell: Cell = {
            literal: { n: i, isPositive: true },
            headerIndex: 0,
            backLink: null,
            forwardLink: null,
            cc: 0,
            index: 2 * i + 1,
        };
        negativeLiteralCell.backLink = negativeLiteralCell;
        negativeLiteralCell.forwardLink = negativeLiteralCell;
        cells.push(negativeLiteralCell);
    }
    let starts = new Array(m).fill(0);
    let sizes = new Array(m).fill(0);
    let clauseNumber = F.length;
    for (let clause of F.reverse()) {
        starts[clauseNumber - 1] = cells.length;
        sizes[clauseNumber - 1] = clause.length;
        for (let literal of clause.sort(by((l) => -l.n, (l) => -l.isPositive))) {
            let headerIndex = 2 * literal.n + (literal.isPositive
                ? 0
                : 1);
            let cell: Cell = {
                headerIndex,
                backLink: null,
                forwardLink: null,
                literal,
                cc: clauseNumber,
                index: cells.length,
            };
            let headerCell = cells[headerIndex];
            // [H]<-->[O]
            // to
            // [H]<-->[C]<-->[O]
            cell.forwardLink = headerCell.forwardLink;
            cell.forwardLink!.backLink = cell;
            headerCell.forwardLink = cell;
            cell.backLink = headerCell;
            ++headerCell.cc;
            cells.push(cell);
        }
        --clauseNumber;
    }
    let table = {
        m,
        L: cells.map((c) => c.headerIndex),
        F: cells.map((c) => c.forwardLink?.index ?? 0),
        B: cells.map((c) => c.backLink?.index ?? 0),
        C: cells.map((c) => c.cc),
        starts,
        sizes,
    };
    return table;
}

console.log(buildClauseTable(R));
