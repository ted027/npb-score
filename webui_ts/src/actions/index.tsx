import React from 'react';

// const ALL = 0;
const CENTRAL = 1;
const PACIFIC = 2;

export const changeTab = (selected: number)  => {
  return {
    type: "CHANGE_TAB",
    selected: selected
  };
};

export const changeOrderSelected = (order_selected: number) => {
  return {
    type: "CHANGE_ORDER_SELECTED",
    order_selected: order_selected
  };
};

export const changeLeague = (league_selected: number) => {
  // if (league_selected === ALL)
  var league: string = "CentralPacific";
  if (league_selected === CENTRAL) {
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

export const execSearch = (team: string, name: string) => {
  return {
    type: "EXEC_SEARCH",
    searchTeam: team,
    searchName: name
  };
};

export const resetSearch = () => {
  return {
    type: "RESET_SEARCH",
    searchTeam: "",
    searchName: ""
  };
};

export const handlePopper = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
  console.log("handlepopper");
  console.log(event);
  return {
    type: "HANDLE_POPPER",
    anchorEl: event.currentTarget,
  };
};

// export const clickAway = () => {
//     return {
//         type: 'CLICK_AWAY',
//         open: false
//     }
// }

export const decideTeamText = (event: any) => {
  return {
    type: "DECIDE_TEAM_TEXT",
    team: event.target.value
  };
};

export const decideNameText = (event: any) => {
  return {
    type: "DECIDE_NAME_TEXT",
    name: event.target.value
  };
};
