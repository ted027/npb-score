export const changeTab = (selected) => {
    return {
        type: 'CHANGE_TAB',
        selected: selected
    }
}

export const changeOrderSelected = (order_selected) => {
    return {
        type: 'CHANGE_ORDER_SELECTED',
        order_selected: order_selected
    }
}

export const changeLeague = (league_selected) => {
    var league;
    if (league_selected === ALL) {
      league = "CentralPacific";
    } else if (league_selected === CENTRAL) {
      league = "Central";
    } else if (league_selected === PACIFIC) {
      league = "Pacific";
    }
    return {
        type: 'CHANGE_LEAGUE',
        league_selected: league_selected,
        league: league
    }
}

export const execSearch = (searchTeam, searchName) => {
    return {
        type: 'EXEC_SEARCH',
        searchTeam: searchTeam,
        searchName: searchName
    }
}
