import React from 'react';
import './app.scss';
import { AppContextProvider } from '../app-context-provider/app-context-provider';
import { Header } from '../header';
import { Calendar } from '../calendar';

export function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Header />
        <Calendar />
      </div>
    </AppContextProvider>
  );
}
