import { connect } from "react-redux";
import { Dispatch } from 'redux';
// import { SelectYearBar } from "../components/Years"; TODO
import { selectYear } from "../actions";
import { state } from "../reducers"

const mapStateToProps = (state: state) => {
    return {yearsState: state.Years };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        selectYear: (event: any) => {
            dispatch(selectYear(event))
        }
    }
}
