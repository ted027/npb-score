import React from "react";
import Tab from "@material-ui/core/Tab";
import blue from "@material-ui/core/colors/blue";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { StyleRules } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { selectYears } from "../constants";

export const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    width: "100%",
    marginTop: theme.spacing(8)
  },
  individualRoot: {
    width: "100%",
    marginTop: theme.spacing(14)
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  subtab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "black",
    marginTop: 48
  },
  des: {
    backgroundColor: blue[600],
    color: theme.palette.common.white,
    height: 35
  },
  des2: {
    backgroundColor: "rgba(0,0,0,0)",
    color: theme.palette.common.white,
    fontSize: "100%",
    height: 36
  },
  tableButton: {
    width: "100%",
    maxWidth: 140
  },
  adTypo: {
    display: "flex",
    margin: "auto",
    maxWidth: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  adA: {
    fontSize: "70%"
  },
  adImgWide: {
    margin: "auto",
    width: "100%",
    maxWidth: "720px",
    height: "width",
    marginTop: theme.spacing(1)
  },
  adImg: {
    margin: "auto",
    width: "100%",
    maxWidth: "300px",
    height: "width",
    marginTop: theme.spacing(1)
  },
  fab: {
    position: "fixed",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    zIndex: 20
  },
  textField: {
    width: "100%"
  },
  searchButton: {
    width: "60%",
    position: "absolute",
    right: 2
  },
  resetButton: {
    width: "60%",
    position: "absolute",
    left: 2
  }
});

export function LinkTab(props: {[key: string]: any}) {
  return <Tab component="a" onClick={(event: any) => {}} {...props} />;
}

export function getProperty(head: {[key: string]: any}[], id: string, property: string) {
  for (var item of head) {
    if (item.id === id) {
      return item[property];
    }
  }
  return false;
}

export function stableSort(array: any[], cmp: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order: string, orderBy: string) {
  return order === "asc"
    ? (a: any, b: any) => a[orderBy] - b[orderBy]
    : (a: any, b: any) => b[orderBy] - a[orderBy];
}

export function judgePageReturn(jun: number, page: number, rowsPerPage: number, const_row_length?: number) {
  if (const_row_length) {
    return true;
  }
  if (page * rowsPerPage < jun && jun <= (page + 1) * rowsPerPage) {
    return true;
  }
  return false;
}

export function judgeSearchStr(player: string, team: string, name: string) {
  var playerForSearch = player
    .replace(/\s+/g, "")
    .replace(")", "")
    .split("(");
  var playerName = playerForSearch[0];
  var playerTeam = playerForSearch[1];
  if (team) {
    if (playerTeam !== team) {
      return false;
    }
  }
  if (name) {
    var nameForSearch = name.replace(/\s+/g, "");
    if (playerName.indexOf(nameForSearch) < 0) {
      return false;
    }
  }
  return true;
}

export function enableSearch(main_state?: {searchTeam: string; searchName: string; [key: string]: any}) {
  if (!main_state) {
    return false;
  }
  if (!main_state.searchTeam && !main_state.searchName) {
    return false;
  }
  return true;
}

export function judgeSearch(player: string, main_state?: {searchTeam: string; searchName: string; [key: string]: any}) {
  if (!main_state) {
    return false
  }
  if (!enableSearch(main_state)) {
    return false;
  }
  if (judgeSearchStr(player, main_state.searchTeam, main_state.searchName)) {
    return true;
  }
  return false;
}

export const years_list: selectYears[] = [
  '2019'
]