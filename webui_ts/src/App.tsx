import React from 'react';
// import logo from './logo.svg';
import './App.css';
import VisibleRecords from "./containers/VisibleRecords";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const App: React.FC = () => {
  return (
    <MuiThemeProvider>
      <div className="App">
        <VisibleRecords />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
