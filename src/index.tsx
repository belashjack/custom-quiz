import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
} else {
    console.error('Element with id "root" not found in the document.');
}
