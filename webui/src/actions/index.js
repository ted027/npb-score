const ALL = 0;
const CENTRAL = 1;
const PACIFIC = 2;

export const changeTab = selected => {
  return {
    type: "CHANGE_TAB",
    selected: selected
  };
};

export const changeOrderSelected = order_selected => {
  return {
    type: "CHANGE_ORDER_SELECTED",
    order_selected: order_selected
  };
};

export const changeLeague = league_selected => {
  var league;
  if (league_selected === ALL) {
    league = "CentralPacific";
  } else if (league_selected === CENTRAL) {
    league = "Central";
  } else if (league_selected === PACIFIC) {
    league = "Pacific";
  }
  return {
    type: "CHANGE_LEAGUE",
    league_selected: league_selected,
    league: league
  };
};

export const execSearch = (searchTeam, searchName) => {
  return {
    type: "EXEC_SEARCH",
    searchTeam: searchTeam,
    searchName: searchName
  };
};

export const resetSearch = () => {
  return {
    type: "RESET_SEARCH",
    searchTeam: "",
    searchName: ""
  };
};

export const handlePopper = (event, placement) => {
  const { currentTarget } = event;
  return {
    type: "HANDLE_POPPER",
    anchorEl: currentTarget,
    placement: placement
  };
};

// export const clickAway = () => {
//     return {
//         type: 'CLICK_AWAY',
//         open: false
//     }
// }

export const decideTeamText = event => {
  return {
    type: "DECIDE_TEAM_TEXT",
    team: event.target.value
  };
};

export const decideNameText = event => {
  return {
    type: "DECIDE_NAME_TEXT",
    name: event.target.value
  };
};
