import { useContext } from 'react';
import { AppContext } from './AppContext';

const HelloWorld = () => {
    const value = useContext(AppContext);
    console.log(value);

    return <h1>Hello World</h1>;
};

export default HelloWorld;
