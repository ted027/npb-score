import React from 'react';
import logo from './logo.svg';
import './App.css';
import Pages from './components/Pages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


function App() {
  return (
    <MuiThemeProvider>
    <div className="App">
        <Pages />
    </div>
    </MuiThemeProvider>
  );
}

export default App;
