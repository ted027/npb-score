import React from 'react';
// import logo from './logo.svg';
import './App.css';
import VisibleApp from "./containers/VisibleApp";
// import { MuiThemeProvider } from "@material-ui/core/styles";

const App: React.FC = () => {
  return (
    // <MuiThemeProvider>
    <div className="App">
      <VisibleApp />
    </div>
    // </MuiThemeProvider>
  );
}

export default App;
