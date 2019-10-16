const initialState = {
  anchorEl: null,
  open: false,
  team: "",
  name: ""
};

const Search = (state = initialState, action: {type: string; [key: string]: any} ) => {
  switch (action.type) {
    case "HANDLE_POPPER":
      return {
        anchorEl: action.anchorEl,
        open: !state.open,
        team: state.team,
        name: state.name
      };
    // case 'CLICK_AWAY':
    //     return {
    //         anchorEl: null,
    //         open: false,
    //         team: state.team,
    //         name: state.name
    //     }
    case "DECIDE_TEAM_TEXT":
      return {
        anchorEl: state.anchorEl,
        open: state.open,
        team: action.team,
        name: state.name
      };
    case "DECIDE_NAME_TEXT":
      return {
        anchorEl: state.anchorEl,
        open: state.open,
        team: state.team,
        name: action.name
      };
    case "EXEC_SEARCH":
      return {
        anchorEl: null,
        open: false,
        team: state.team,
        name: state.name
      };
    case "RESET_SEARCH":
      return {
        anchorEl: null,
        open: false,
        team: "",
        name: ""
      };
    default:
      return state;
  }
};

export default Search;
