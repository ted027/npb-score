import { combineReducers } from "redux";
import MainPage from "./page";
import Search from "./search";
import Years from "./years";
import { MainPageIf, SearchIf, YearsIf } from "../constants";

export interface state {
    MainPage: MainPageIf,
    Search: SearchIf,
    Years: YearsIf,
}

const recordsApp = combineReducers({ MainPage, Search, Years });
export default recordsApp;
