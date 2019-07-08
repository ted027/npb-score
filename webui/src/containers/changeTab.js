import { connect } from "react-redux";
import { MainAppBar, OrderAppBar, LeagueAppBar } from "../components/Pages";
import { changeTab, changeOrderSelected, changeLeague } from "../actions";

const mapStateToProps = () => {
  return {};
};

const mapMainDispatchToProps = dispatch => {
  return {
    onChange: (event, selected) => {
      dispatch(changeTab(selected));
    }
  };
};

const mapOrderDispatchToProps = dispatch => {
  return {
    onChange: (event, order_selected) => {
      dispatch(changeOrderSelected(order_selected));
    }
  };
};

const mapLeagueDispatchToProps = dispatch => {
  return {
    onChange: (event, league_selected) => {
      dispatch(changeLeague(league_selected));
    }
  };
};

export const VisibleMainAppBar = connect(
  mapStateToProps,
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
