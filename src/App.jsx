import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <div className="App">
          <HomePage />
        </div>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
