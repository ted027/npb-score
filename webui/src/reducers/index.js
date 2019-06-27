export const MainPage = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TAB':
            return {
                selected: action.selected,
                order_selected: state.order_selected,
                league_selected: state.league_selected,
                league: state.league,
                searchTeam: "",
                searchName: ""
            }
        default:
            return state
    }
}
