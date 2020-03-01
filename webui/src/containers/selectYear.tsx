import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { SelectYearBar } from "../components/Pages";
import { selectYear } from "../actions";
import { state } from "../reducers";

const mapStateToProps = (state: state) => {
    return {
        yearState: state.Years
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onChange: (event: any) => {
            dispatch(selectYear(event));
        }
    }
}

export const VisibleSelectYearBar = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true}
)(SelectYearBar);
