export const getRandomFromArray = <T>(array: T[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
};

export const doArraysContainSameValues = <T>(array1: T[], array2: T[]) => {
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    if (set1.size !== set2.size) return false;

    for (const item of set1) {
        if (!set2.has(item)) return false;
    }

    return true;
};
