let permutation = [1, 2, 3, 4, 5, 6];
let n = permutation.length;

function swap(i1: number, i2: number): void {
    let t = permutation[i1];
    permutation[i1] = permutation[i2];
    permutation[i2] = t;
}

PERMUTATION: while (true) {
    console.log(permutation);

    let j = n - 2;
    while (permutation[j] >= permutation[j + 1]) {
        j -= 1;
        if (j < 0) {
            break PERMUTATION;
        }
    }

    let l = n - 1;
    while (permutation[j] >= permutation[l]) {
        l -= 1;
    }
    swap(j, l);

    let k = j + 1;
    l = n - 1;
    while (k < l) {
        swap(k, l);
        k += 1;
        l -= 1;
    }
}
