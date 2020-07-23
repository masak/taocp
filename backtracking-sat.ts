type Variable = number;

type Literal = {
    variable: Variable,
    isPositive: boolean,
};

function literal(variable: Variable): Literal {
    return { variable, isPositive: true };
}

function negatedLiteral(variable: Variable): Literal {
    return { variable, isPositive: false };
}

function not(v: Literal): Literal {
    return {
        variable: v.variable,
        isPositive: !v.isPositive,
    };
}

type Clause = Literal[];

function clauseIsEmpty(c: Clause) {
    return c.length === 0;
}

type Formula = Clause[];

function formulaIsEmpty(F: Formula) {
    return F.length === 0;
}

function pickLiteralIn(F: Formula): Literal {
    return F[0][0];
}

function literalNotEqualTo(l1: Literal) {
    return (l2: Literal) => (
        l1.variable !== l2.variable
        || l1.isPositive !== l2.isPositive
    );
}

function doesNotContain(l: Literal) {
    return (C: Clause) => C.every(literalNotEqualTo(l));
}

function removeLiteral(l: Literal) {
    return (C: Clause) => C.filter(literalNotEqualTo(l));
}

function formulaGiven(F: Formula, l: Literal): Formula {
    return F.filter(doesNotContain(l))
        .map(removeLiteral(not(l)));
}

type Solution = Literal[];
type NoSolution = undefined;

function emptySolution(): Solution {
    return [];
}

function noSolution(): NoSolution {
    return undefined;
}

function isSolution(L: Solution | NoSolution): L is Solution {
    return typeof L === "object";
}

function unionSolution(L: Solution, l: Literal): Solution {
    return [...L, l];
}

function satisfy(F: Formula): Solution | NoSolution {
    if (formulaIsEmpty(F)) {
        return emptySolution();
    }
    else if (F.some(clauseIsEmpty)) {
        return noSolution();
    }
    else {
        let l = pickLiteralIn(F);
        let L = satisfy(formulaGiven(F, l));
        if (isSolution(L)) {
            return unionSolution(L, l);
        }
        else {
            L = satisfy(formulaGiven(F, not(l)));
            if (isSolution(L)) {
                return unionSolution(L, not(l));
            }
            else {
                return noSolution();
            }
        }
    }
}

function parseClause(signedNums: number[]): Clause {
    return signedNums.map((n) => {
        return n > 0
            ? literal(n)
            : negatedLiteral(Math.abs(n));
    });
}

function parseFormula(...clauses: number[][]): Formula {
    return clauses.map(parseClause);
}

let F: Formula = parseFormula(
    [1, -2],
    [2, 3],
    [-1, -3],
    [-1, -2, 3],
);

console.log(satisfy(F));
