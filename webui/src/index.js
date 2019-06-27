import '@babel/polyfill'; 
import "react-app-polyfill/ie9";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MainPage from './reducers'

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// disable the production enviroment analytics
process.env.NODE_ENV === "development" && (window.gtagPageview = (path) => { /*console.log("pageview:", path);*/ });

let store = createStore(MainPage)

ReactDOM.render(
    <Provider store={store}>
        <App />,
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
