import { connect } from 'react-redux';
import Search from './components/Search';
import { execSearch, resetSearch, handlePopper, decideTeamText, decideNameText } from '../actions';

const mapStateToProps = (state) => {
    return { searchState: state.Search }
}

const mapDispatchToProps = (dispatch) => {
    return {
        execSearch: (team, name) => {
            dispatch(execSearch(team, name))
        },
        resetSearch: () => {
            dispatch(resetSearch())
        },
        handlePopper: (placement) => (event) => {
            dispatch(handlePopper(placement))
        },
        // clickAway: () => {
        //     dispatch(clickAway())
        // },
        decideTeamText: (event) => {
            dispatch(decideTeamText())
        },
        decideNameText: (event) => {
            dispatch(decideNameText())
        },
    }
}

const VisibleSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)

export default VisibleSearch;
