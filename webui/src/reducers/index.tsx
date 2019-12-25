import { combineReducers } from "redux";
import MainPage, { MainPageIf } from "./page";
import Search, { SearchIf } from "./search";

export interface state {
    MainPage: MainPageIf,
    Search: SearchIf
}

const recordsApp = combineReducers({ MainPage, Search });
export default recordsApp;
