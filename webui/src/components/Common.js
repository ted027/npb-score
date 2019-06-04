import React from "react";
import Tab from "@material-ui/core/Tab";

export const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    fontSize: "55%"
  },
  individualRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 14,
    fontSize: "55%"
  },
  table: {
    maxWidth: 320
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
    height: 32,
    fontSize: "160%"
  },
  adTypo: {
    display: "flex",
    margin: "auto",
    maxWidth: "100%"
  },
  adA: {
    fontSize: "80%"
  },
  adImg: {
    margin: "auto",
    width: "100%",
    maxWidth: "720px",
    height: "width"
  }
});

export function LinkTab(props) {
  return <Tab component="a" onClick={event => {}} {...props} />;
}

export function getProperty(head, id, property) {
  for (var item of head) {
    if (item.id === id) {
      return item[property];
    }
  }
  return false;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === "asc"
    ? (a, b) => a[orderBy] - b[orderBy]
    : (a, b) => b[orderBy] - a[orderBy];
}
