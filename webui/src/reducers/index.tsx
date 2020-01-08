import { combineReducers } from "redux";
import MainPage, { MainPageIf } from "./page";
import Search, { SearchIf } from "./search";
import Years, { YearsIf } from "./years";

export interface state {
    MainPage: MainPageIf,
    Search: SearchIf,
    Years: YearsIf,
}

const recordsApp = combineReducers({ MainPage, Search, Years });
export default recordsApp;
