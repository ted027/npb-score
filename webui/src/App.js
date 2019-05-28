import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tables from './components/Tables';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


function App() {
  return (
    <MuiThemeProvider>
    <div className="App">
        <Tables />
    </div>
    </MuiThemeProvider>
  );
}

export default App;
