import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tab from "@material-ui/core/Tab";
import yellow from "@material-ui/core/colors/yellow";

export const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    fontSize: "80%"
  },
  individualRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 14,
    fontSize: "80%"
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
  des: {
    height: 35,
    fontSize: "115%"
  },
  subtab: {
    flexGrow: 1,
    backgroundColor: "#DCDCDC",
    color: "black",
    marginTop: 48
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

export const CustomTableCellOrder = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 7,
    zindex: 3
  },
  body: {
    fontSize: 14,
    maxWidth: 7,
    zindex: 1
  }
}))(TableCell);

export const CustomTableCellName = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 90,
    zindex: 3
  },
  body: {
    fontSize: 14,
    maxWidth: 90,
    zindex: 1
  }
}))(TableCell);

export const CustomTableCellShort = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    minWidth: 24,
    zindex: 2
  },
  body: {
    fontSize: 14,
    zindex: 0
  }
}))(TableCell);

export const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 90,
    zindex: 2
  },
  body: {
    fontSize: 14,
    maxWidth: 90,
    zindex: 0
  }
}))(TableCell);

export const CustomTableSortLabel = withStyles({
  root: {
    "&:hover": {
      color: yellow[600]
    },
    "&:focus": {
      color: yellow[600]
    },
    zindex: 2
  }
})(TableSortLabel);

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
