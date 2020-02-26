import { connect } from "react-redux";
import { Dispatch } from 'redux';
import { SelectYearBar } from "../components/Pages";
import { selectYear } from "../actions";

const mapStateToProps = () => {
    return { };
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
