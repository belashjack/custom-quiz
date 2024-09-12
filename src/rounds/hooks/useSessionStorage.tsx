import { useEffect, useState } from 'react';

const useSessionStorage = <T,>(
    key: string,
    initialValue: T
): [value: T, setValue: React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        const item = sessionStorage.getItem(key);
        return item === null ? initialValue : (JSON.parse(item) as T);
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useSessionStorage;
