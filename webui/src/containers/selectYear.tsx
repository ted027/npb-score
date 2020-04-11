import { connect } from "react-redux";
import { Dispatch } from "redux";
import { SelectYearForm, SelectYearPopper } from "../components/Years";
import { yearHandlePopper, selectYear } from "../actions";
import { state } from "../reducers";

const mapStateToProps = (state: state) => {
  return { yearState: state.Years };
};

const mapDispatchToFormProps = (dispatch: Dispatch) => {
  return {
    onSelectYear: (event: any) => {
      dispatch(selectYear(event));
    }
  };
};

const mapDispatchToPopperProps = (dispatch: Dispatch) => {
  return {
    onSelectYear: (event: any) => {
      dispatch(selectYear(event));
    },
    yearHandlePopper: (event: any) => {
      dispatch(yearHandlePopper(event));
    }
    // clickAway: (event: any) => {
    //     dispatch(clickAway())
    // }
  };
};

export const VisibleSelectYearForm = connect(
  mapStateToProps,
  mapDispatchToFormProps,
  null,
  { forwardRef: true }
)(SelectYearForm);

export const VisibleSelectYearPopper = connect(
  mapStateToProps,
  mapDispatchToPopperProps,
  null,
  { forwardRef: true }
)(SelectYearPopper);
