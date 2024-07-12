import HelloWorld from './HelloWorld';
import AppContextProvider from './AppContext';

const App = () => {
    return (
        <AppContextProvider>
            <HelloWorld />
        </AppContextProvider>
    );
};

export default App;
