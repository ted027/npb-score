import { combineReducers } from 'redux';
import MainPage from './page';
import Search from './search';

const recordsApp = combineReducers({ MainPage, Search });
export default recordsApp;
