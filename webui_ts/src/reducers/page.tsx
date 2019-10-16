const DEFAULT_ORDER = 0;
const DEFAULT_ALL = 0;

const initialState = {
  selected: 0,
  order_selected: 0,
  league_selected: 0,
  league: "CentralPacific",
  searchTeam: "",
  searchName: ""
};

const MainPage = (state = initialState, action: {type: string; [key: string]: string | number} ) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return {
        selected: action.selected,
        order_selected: DEFAULT_ORDER,
        league_selected: DEFAULT_ALL,
        league: "CentralPacific",
        searchTeam: "",
        searchName: ""
      };
    case "CHANGE_ORDER_SELECTED":
      return {
        selected: state.selected,
        order_selected: action.order_selected,
        league_selected: DEFAULT_ALL,
        league: "CentralPacific",
        searchTeam: "",
        searchName: ""
      };
    case "CHANGE_LEAGUE":
      return {
        selected: state.selected,
        order_selected: DEFAULT_ORDER,
        league_selected: action.league_selected,
        league: action.league,
        searchTeam: "",
        searchName: ""
      };
    case "EXEC_SEARCH":
    case "RESET_SEARCH":
      return {
        selected: state.selected,
        order_selected: state.order_selected,
        league_selected: state.league_selected,
        league: state.league,
        searchTeam: action.searchTeam,
        searchName: action.searchName
      };
    default:
      return state;
  }
};

export default MainPage;
