export const getRandomFromArray = <T>(array: T[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
};

export const doArraysContainSameValues = (array1: unknown[], array2: unknown[]) => {
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    if (set1.size !== set2.size) return false;

    for (const item of set1) {
        if (!set2.has(item)) return false;
    }

    return true;
};

export const areArraysEqual = (array1: unknown[], array2: unknown[]) =>
    array1.length === array2.length && array1.every((value, index) => value === array2[index]);

const morseCodeMap: Record<string, string> = {
    a: '.-',
    b: '-...',
    c: '-.-.',
    d: '-..',
    e: '.',
    f: '..-.',
    g: '--.',
    h: '....',
    i: '..',
    j: '.---',
    k: '-.-',
    l: '.-..',
    m: '--',
    n: '-.',
    o: '---',
    p: '.--.',
    q: '--.-',
    r: '.-.',
    s: '...',
    t: '-',
    u: '..-',
    v: '...-',
    w: '.--',
    x: '-..-',
    y: '-.--',
    z: '--..',
    '0': '-----',
    '1': '.----',
    '2': '..---',
    '3': '...--',
    '4': '....-',
    '5': '.....',
    '6': '-....',
    '7': '--...',
    '8': '---..',
    '9': '----.',
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    "'": '.----.',
    '!': '-.-.--',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '&': '.-...',
    ':': '---...',
    ';': '-.-.-.',
    '=': '-...-',
    '+': '.-.-.',
    '-': '-....-',
    _: '..--.-',
    '"': '.-..-.',
    $: '...-..-',
    '@': '.--.-.',
};

const inverseMorseCodeMap: Record<string, string> = Object.fromEntries(
    Object.entries(morseCodeMap).map(([letter, code]) => [code, letter])
);

export const encodeToMorse = (text: string) => {
    return text
        .toLowerCase()
        .split(' ')
        .map((word) =>
            word
                .split('')
                .map((char) => morseCodeMap[char] || '')
                .filter(Boolean)
                .join(' ')
        )
        .join('   ');
};

// Not used, but let it be here for the future
export const decodeFromMorse = (morseCode: string) => {
    return morseCode
        .split('   ')
        .map((word) =>
            word
                .split(' ')
                .map((code) => inverseMorseCodeMap[code] || '')
                .join('')
        )
        .join(' ');
};

export const shuffleArray = <T>(array: T[]) => array.sort(() => Math.random() - 0.5);
