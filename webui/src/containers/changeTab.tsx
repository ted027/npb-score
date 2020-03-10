import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { MainAppBar, OrderAppBar, LeagueAppBar } from "../components/Pages";
import { changeTab, changeOrderSelected, changeLeague, selectYear } from "../actions";
import { state } from "../reducers";

const mapStateToProps = () => {
  return {};
};

const mapMainStateToProps = (state: state) => {
  return {
      yearState: state.Years
  };
};

const mapMainDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSelectRecords: (event: any, selected: number) => {
      dispatch(changeTab(selected));
    },
    onSelectYear: (event: any) => {
      dispatch(selectYear(event));
    }
  };
};

const mapOrderDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (event: any, order_selected: number) => {
      dispatch(changeOrderSelected(order_selected));
    }
  };
};

const mapLeagueDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (event: any, league_selected: number) => {
      dispatch(changeLeague(league_selected));
    }
  };
};

export const VisibleMainAppBar = connect(
  mapMainStateToProps,
  mapMainDispatchToProps,
  null,
  { forwardRef: true }
)(MainAppBar);

export const VisibleOrderAppBar = connect(
  mapStateToProps,
  mapOrderDispatchToProps,
  null,
  { forwardRef: true }
)(OrderAppBar);

export const VisibleLeagueAppBar = connect(
  mapStateToProps,
  mapLeagueDispatchToProps,
  null,
  { forwardRef: true }
)(LeagueAppBar);
