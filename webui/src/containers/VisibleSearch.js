import { connect } from 'react-redux';
import { SearchContents } from './components/Search';
import { execSearch, resetSearch, handlePopper, decideTeamText, decideNameText } from '../actions';

const mapStateToProps = (state) => {
    return { searchState: state.Search }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSearchExec: (team, name) => {
            dispatch(execSearch(team, name))
        },
        handleSearchReset: () => {
            dispatch(resetSearch())
        },
        handleSearchPopper: (placement) => (event) => {
            dispatch(handlePopper(placement))
        },
        // handleClickAway: () => {
        //     dispatch(clickAway())
        // },
        handleDecideTeamText: (event) => {
            dispatch(decideTeamText())
        },
        handleDecideNameText: (event) => {
            dispatch(decideNameText())
        },
    }
}

const VisibleSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchContents)

export default VisibleSearch;
