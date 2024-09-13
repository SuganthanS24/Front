import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Correct import for the App component
import 'regenerator-runtime/runtime'; // Ensure this is installed and imported if needed

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
