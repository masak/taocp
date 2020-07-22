type Variable = number;

interface Negated<T> {
    (): Variable;
}

type Literal = Variable | Negated<Variable>;

function isNegated(v: Literal): v is Negated<Variable> {
    return typeof v === "function";
}

function not(v: Literal): Literal {
    if (isNegated(v)) {
        return v();
    } else {
        return () => v;
    }
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

function formulaGiven(F: Formula, l: Literal): Formula {
    // xxx
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

let F: Formula = [
    [1, not(2)],
    [2, 3],
    [not(1), not(3)],
    [not(1), not(2), 3],
];

console.log(satisfy(F));
