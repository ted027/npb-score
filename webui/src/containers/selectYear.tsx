import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SelectYearForm, SelectYearPopper } from "../components/Years";
import { handlePopper, selectYear } from "../actions";
import { state } from "../reducers";

const mapStateToProps = (state: state) => {
  return { searchState: state.Search };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSelectYear: (event: any) => {
      dispatch(selectYear(event));
    },
    handlePopper: (event: any) => {
      dispatch(handlePopper(event));
    }
    // clickAway: (event: any) => {
    //     dispatch(clickAway())
    // }
  };
};

export const VisibleSelectYearForm = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(SelectYearForm);

export const VisibleSelectYearPopper = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(SelectYearPopper);
