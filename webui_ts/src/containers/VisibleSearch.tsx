import { connect } from "react-redux";
import { Dispatch } from 'redux';
import Search from "../components/Search";
import {
  execSearch,
  resetSearch,
  handlePopper,
  decideTeamText,
  decideNameText
} from "../actions";
import { state } from "../reducers"

const mapStateToProps = (state: state) => {
  return { searchState: state.Search };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    execSearch: (team: string, name: string) => {
      dispatch(execSearch(team, name));
    },
    resetSearch: (event: any) => {
      dispatch(resetSearch());
    },
    handlePopper: (event: any) => {
      dispatch(handlePopper(event));
    },
    // clickAway: (event: any) => {
    //     dispatch(clickAway())
    // },
    decideTeamText: (event: any) => {
      dispatch(decideTeamText(event));
    },
    decideNameText: (event: any) => {
      dispatch(decideNameText(event));
    }
  };
};

const VisibleSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Search);

export default VisibleSearch;
