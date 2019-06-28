const Search = (state, action) => {
    switch (action.type) {
        case 'HANDLE_POPPER':
            return {
                anchorEl: action.anchorEl,
                open: state.placement !== action.placement || !state.open,
                placement: action.placement,
                team: state.team,
                name: state.name
            }
        // case 'CLICK_AWAY':
        //     return {
        //         anchorEl: null,
        //         open: false,
        //         placement: null,
        //         team: state.team,
        //         name: state.name
        //     }
        case 'DECIDE_TEAM_TEXT':
            return {
                anchorEl: state.anchorEl,
                open: state.open,
                placement: state.placement,
                team: action.team,
                name: state.name
            } 
        case 'DECIDE_NAME_TEXT':
            return {
                anchorEl: state.anchorEl,
                open: state.open,
                placement: state.placement,
                team: state.team,
                name: action.name
            }
        case 'EXEC_SEARCH':
            return {
                anchorEl: null,
                open: false,
                placement: null,
                team: state.team,
                name: state.name
            }
        case 'RESET_SEARCH':
            return {
                anchorEl: null,
                open: false,
                placement: null,
                team: "",
                name: ""
            }
        default:
            return state
    }
}

export default Search;