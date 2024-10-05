import AppContextProvider from './AppContext';
import Quiz from './Quiz';
import './index.scss';

const App = () => {
    if (process.env.NODE_ENV === 'production') {
        console.log(
            'https://www.google.com/search?q=why+is+it+bad+to+spy&oq=wh&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIGCAEQRRg7MgYIAhBFGDsyBggDEEUYOzIGCAQQRRhAMgYIBRBFGDwyBggGEEUYPTIGCAcQRRg80gEIMTA3M2owajmoAgCwAgE&sourceid=chrome&ie=UTF-8'
        );
    }

    return (
        <AppContextProvider>
            <Quiz />
        </AppContextProvider>
    );
};

export default App;
