import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MediaQuery from "react-responsive";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import yellow from "@material-ui/core/colors/yellow";
import { stableSort, getSorting, getProperty } from "./Common";

const IGNORE_ELEMENTS = ["規定", "League"];
const NARROW_BR_ELEMENTS = ["チーム", "選手", "球場"];
const IGNORE_ELEM_NUM = 2;

const CustomTableCellOrder = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 25
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    maxWidth: 25
  }
}))(TableCell);

const CustomTableCellOrderWide = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 25
  },
  body: {
    fontSize: 14,
    maxWidth: 25,
    textAlign: "center"
  }
}))(TableCell);

const CustomTableCellName = withStyles(theme => ({
  body: {
    fontSize: 14
  }
}))(TableCell);

// const CustomTableCellShort = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//     minWidth: 24,
//   },
//   body: {
//     fontSize: 14,
//   }
// }))(TableCell);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    textAlign: "right"
  },
  body: {
    fontSize: 14,
    textAlign: "right"
  }
}))(TableCell);

const CustomTableCellWide = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 15,
    textAlign: "right"
  },
  body: {
    fontSize: 16,
    textAlign: "right"
  }
}))(TableCell);

const CustomTableSortLabel = withStyles({
  root: {
    "&:hover": {
      color: yellow[600]
    },
    "&:focus": {
      color: yellow[600]
    }
  }
})(TableSortLabel);

class CommonTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, head } = this.props;
    return (
      <TableHead>
        <MediaQuery query="(max-width: 767px)">
          <TableRow>
            <CustomTableCellOrder padding="checkbox" />
            {head.map(cell => {
              if (
                IGNORE_ELEMENTS.indexOf(cell.id) < 0 &&
                NARROW_BR_ELEMENTS.indexOf(cell.id) < 0
              ) {
                if (cell.numeric) {
                  return (
                    <CustomTableCell
                      key={cell.id}
                      numeric={cell.numeric}
                      padding={cell.disablePadding ? "checkbox" : "none"}
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <CustomTableSortLabel
                        onClick={this.createSortHandler(cell.id)}
                      >
                        {cell.label}
                      </CustomTableSortLabel>
                    </CustomTableCell>
                  );
                } else {
                  return (
                    <CustomTableCell
                      key={cell.id}
                      numeric={cell.numeric}
                      padding={cell.disablePadding ? "checkbox" : "none"}
                    >
                      {cell.label}
                    </CustomTableCell>
                  );
                }
              }
            }, this)}
          </TableRow>
        </MediaQuery>
        <MediaQuery query="(min-width: 767px)">
          <TableRow>
            <CustomTableCellOrderWide padding="checkbox" />
            {head.map(cell => {
              if (IGNORE_ELEMENTS.indexOf(cell.id) < 0) {
                if (cell.numeric) {
                  return (
                    <CustomTableCellWide
                      key={cell.id}
                      numeric={cell.numeric}
                      padding={cell.disablePadding ? "checkbox" : "none"}
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <CustomTableSortLabel
                        onClick={this.createSortHandler(cell.id)}
                      >
                        {cell.label}
                      </CustomTableSortLabel>
                    </CustomTableCellWide>
                  );
                } else {
                  return (
                    <CustomTableCellWide
                      key={cell.id}
                      numeric={cell.numeric}
                      padding={cell.disablePadding ? "checkbox" : "none"}
                    >
                      {cell.label}
                    </CustomTableCellWide>
                  );
                }
              }
            }, this)}
          </TableRow>
        </MediaQuery>
      </TableHead>
    );
  }
}

CommonTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  head: PropTypes.array.isRequired
};

export class CommonTable extends React.Component {
  state = {
    order: this.props.default_order,
    orderBy: this.props.default_orderBy,
    orderMean: "good"
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    var firstOrder = getProperty(this.props.head, property, "defaultOrder");
    var reverseOrder;

    if (firstOrder === "desc") {
      reverseOrder = "asc";
    } else if (firstOrder === "asc") {
      reverseOrder = "desc";
    }

    let order = firstOrder;
    let orderMean = "good";

    if (this.state.orderBy === property && this.state.order === firstOrder) {
      order = reverseOrder;
      orderMean = "bad";
    }

    this.setState({ order, orderBy, orderMean });
  };

  render() {
    const { classes, data, head, row_length, league } = this.props;
    const { order, orderBy } = this.state;
    var jun = 0;
    var jun2 = 0;
    var row_count = 0;
    var row_count2 = 0;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CommonTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              head={head}
            />
            <MediaQuery query="(max-width: 767px)">
              {stableSort(data, getSorting(order, orderBy)).map(n => {
                if (n.League === league && row_count < row_length) {
                  if (!getProperty(head, orderBy, "regulated") || n.規定) {
                    {
                      row_count++;
                    }
                    return (
                      <TableBody>
                        {Object.keys(n).map(value => {
                          if (NARROW_BR_ELEMENTS.indexOf(value) >= 0) {
                            return (
                              <TableRow hover tabIndex={-1} key={n.id}>
                                <CustomTableCellOrder
                                  rowSpan="2"
                                  numeric="false"
                                  padding="checkbox"
                                >
                                  {(jun = jun + 1)}
                                </CustomTableCellOrder>
                                <CustomTableCellName
                                  colSpan={
                                    Object.keys(n).length - IGNORE_ELEM_NUM
                                  }
                                  numeric="false"
                                >
                                  {n[value]}
                                </CustomTableCellName>
                              </TableRow>
                            );
                          }
                        })}
                        <TableRow hover tabIndex={-1} key={n.id}>
                          {Object.keys(n).map(value => {
                            if (
                              IGNORE_ELEMENTS.indexOf(value) < 0 &&
                              NARROW_BR_ELEMENTS.indexOf(value) < 0
                            ) {
                              return (
                                <CustomTableCell
                                  numeric={value.numeric}
                                  padding={
                                    value.disablePadding ? "checkbox" : "none"
                                  }
                                >
                                  {n[value]}
                                </CustomTableCell>
                              );
                            }
                          })}
                        </TableRow>
                      </TableBody>
                    );
                  }
                }
              })}
            </MediaQuery>
            <MediaQuery query="(min-width: 767px)">
              <TableBody>
                {stableSort(data, getSorting(order, orderBy)).map(n => {
                  if (n.League === league && row_count2 < row_length) {
                    if (!getProperty(head, orderBy, "regulated") || n.規定) {
                      {
                        row_count2++;
                      }
                      return (
                        <TableRow hover tabIndex={-1} key={n.id}>
                          <CustomTableCellOrderWide
                            numeric="false"
                            padding="checkbox"
                          >
                            {(jun2 = jun2 + 1)}
                          </CustomTableCellOrderWide>
                          {Object.keys(n).map(value => {
                            if (IGNORE_ELEMENTS.indexOf(value) < 0) {
                              return (
                                <CustomTableCellWide
                                  numeric={value.numeric}
                                  padding={
                                    value.disablePadding ? "checkbox" : "none"
                                  }
                                >
                                  {n[value]}
                                </CustomTableCellWide>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    }
                  }
                })}
              </TableBody>
            </MediaQuery>
          </Table>
        </div>
      </Paper>
    );
  }
}
CommonTable.propTypes = {
  classes: PropTypes.object.isRequired,
  default_order: PropTypes.string.isRequired,
  default_orderBy: PropTypes.string.isRequired,
  head: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  row_length: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
};
