import React from "react";
import Tab from "@material-ui/core/Tab";
import { selectYears } from "../constants";

export const years_list: selectYears[] = ['2019', '2020', '2021', '2022'];

export const LinkTab = (props: { [key: string]: any }) => (
  <Tab component="a" onClick={(event: any) => {}} {...props} />
);

export const getProperty = (
  head: { [key: string]: any }[],
  id: string,
  property: string
) => {
  for (var item of head) {
    if (item.id === id) {
      return item[property];
    }
  }
  return false;
};

export const stableSort = (array: any[], cmp: (a: any, b: any) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order: string, orderBy: string) =>
  order === "asc"
    ? (a: any, b: any) => a[orderBy] - b[orderBy]
    : (a: any, b: any) => b[orderBy] - a[orderBy];

export const judgePageReturn = (
  jun: number,
  page: number,
  rowsPerPage: number,
  const_row_length?: number
) => {
  if (const_row_length) {
    return true;
  }
  if (page * rowsPerPage < jun && jun <= (page + 1) * rowsPerPage) {
    return true;
  }
  return false;
}

export const judgeSearchStr = (player: string, team: string, name: string) => {
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

export const enableSearch = (main_state?: {
  searchTeam: string;
  searchName: string;
  [key: string]: any;
}) => {
  if (!main_state) {
    return false;
  }
  if (!main_state.searchTeam && !main_state.searchName) {
    return false;
  }
  return true;
}

export const judgeSearch = (
  player: string,
  main_state?: { searchTeam: string; searchName: string; [key: string]: any }
) => {
  if (!main_state) {
    return false;
  }
  if (!enableSearch(main_state)) {
    return false;
  }
  if (judgeSearchStr(player, main_state.searchTeam, main_state.searchName)) {
    return true;
  }
  return false;
}
