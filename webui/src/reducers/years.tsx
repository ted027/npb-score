import { years_list } from "../components/Common";

export interface YearsIf {
    year_selected: number;
}

interface action extends YearsIf {
    type: string;
}

const initialState: YearsIf = {
    year_selected: years_list.slice(-1)[0]
}

const Years = (state = initialState, action: action): YearsIf => {
    switch (action.type) {
        case "SELECT_YEAR":
            return {
                year_selected: action.year_selected
            }
        default:
            return state;
    }
}

export default Years
