import { years_list } from "../components/Common";
import { YearsIf } from "../constants";

interface action extends YearsIf {
  type: string;
}

const initialState: YearsIf = {
  anchorEl: null,
  open: false,
  year_selected: years_list.slice(-1)[0]
};

const Years = (state = initialState, action: action): YearsIf => {
  switch (action.type) {
    case "SELECT_YEAR":
      return {
        anchorEl: null,
        open: false,
        year_selected: action.year_selected
      };
    case "YEAR_HANDLE_POPPER":
      return {
        anchorEl: action.anchorEl,
        open: !state.open,
        year_selected: state.year_selected
      };
    default:
      return state;
  }
};

export default Years;
