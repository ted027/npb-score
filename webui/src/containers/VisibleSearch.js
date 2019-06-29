import { connect } from 'react-redux';
import Search from '../components/Search';
import { execSearch, resetSearch, handlePopper, decideTeamText, decideNameText } from '../actions';

const mapStateToProps = (state) => {
    return { searchState: state.Search }
}

const mapDispatchToProps = (dispatch) => {
    return {
        execSearch: (event, team, name) => {
            dispatch(execSearch(team, name))
        },
        resetSearch: (event) => {
            dispatch(resetSearch())
        },
        handlePopper: (event, placement) => {
            dispatch(handlePopper(event, placement))
        },
        // clickAway: (event) => {
        //     dispatch(clickAway())
        // },
        decideTeamText: (event) => {
            dispatch(decideTeamText(event))
        },
        decideNameText: (event) => {
            dispatch(decideNameText(event))
        },
    }
}

const VisibleSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search)

export default VisibleSearch;
