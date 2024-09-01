import AppContextProvider from './AppContext';
import Quiz from './Quiz';
import './index.scss';

const App = () => {
    return (
        <AppContextProvider>
            <Quiz />
        </AppContextProvider>
    );
};

export default App;
