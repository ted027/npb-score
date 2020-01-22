import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { SelectYearBar } from "../components/Pages"; TODO
import { selectYear } from "../actions";
import { state } from "../reducers"

const mapStateToProps = (state: state) => {
    return {yearsState: state.Years };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onChange: (event: any, year_selected: number) => {
            dispatch(selectYear(year_selected));
        }
    }
}

export const VisibleSelectYearBar = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true}
)(SelectYearBar);