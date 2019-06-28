import { connect } from 'react-redux';
import { MainAppBar, OrderAppBar, LeagueAppBar } from './components/Pages';
import { changeTab, changeOrderSelected, changeLeague } from '../actions';

const mapMainDispatchToProps = (dispatch) => {
    return {
        onClick: (selected) => {
            dispatch(changeTab(selected));
        }
    }
}

const mapOrderDispatchToProps = (dispatch) => {
    return {
        onClick: (order_selected) => {
            dispatch(changeOrderSelected(order_selected));
        }
    }
}

const mapLeagueDispatchToProps = (dispatch) => {
    return {
        onClick: (league_selected) => {
            dispatch(changeLeague(league_selected));
        }
    }
}

export const VisibleMainAppBar = connect(
    mapMainDispatchToProps
)(MainAppBar)

export const VisibleOrderAppBar = connect(
    mapOrderDispatchToProps
)(OrderAppBar)

export const VisibleLeagueAppBar = connect(
    mapLeagueDispatchToProps
)(LeagueAppBar)
