import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MediaQuery from "react-responsive";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import {
  styles,
  stableSort,
  getSorting,
  getProperty,
  judgePageReturn,
  enableSearch,
  judgeSearch
} from "./Common";

const IGNORE_ELEMENTS = ["規定", "League"];
const NARROW_BR_ELEMENTS = ["チーム", "選手", "球場"];
const IGNORE_ELEM_NUM = 2;

const CustomTableCellOrder = withStyles(theme => ({
  head: {
    backgroundColor: grey[100],
    width: 20
  },
  body: {
    fontSize: 14,
    textAlign: "center",
    width: 20,
    borderRight: "1px solid lightgrey"
  }
}))(TableCell);

const CustomTableCellOrderWide = withStyles(theme => ({
  head: {
    backgroundColor: grey[100],
    maxWidth: 20
  },
  body: {
    fontSize: 14,
    maxWidth: 20,
    textAlign: "center",
    padding: 5
  }
}))(TableCell);

const CustomTableCellName = withStyles(theme => ({
  body: {
    fontSize: 15,
    padding: 1,
    paddingLeft: "7%"
  }
}))(TableCell);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: grey[100],
    fontSize: 15,
    padding: 1,
    textAlign: "center"
  },
  body: {
    fontSize: 15,
    textAlign: "center",
    padding: 1
  }
}))(TableCell);

const CustomTableCellWide = withStyles(theme => ({
  head: {
    backgroundColor: grey[100],
    fontSize: 15,
    padding: 1,
    textAlign: "center"
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    padding: 3
  }
}))(TableCell);

class CommonTableHeadWithoutStyles extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { classes, order, orderBy, orderMean, head } = this.props;
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
                      padding="checkbox"
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <Button
                        style={{
                          "textTransform": "none"
                        }}
                        variant={orderBy === cell.id ? "contained" : "outlined"}
                        size="small"
                        color={
                          orderBy === cell.id && orderMean === "good"
                            ? "secondary"
                            : orderBy === cell.id
                            ? "default"
                            : "inherit"
                        }
                        onClick={this.createSortHandler(cell.id)}
                        className={classes.tableButton}
                      >
                        {cell.label}
                      </Button>
                    </CustomTableCell>
                  );
                } else {
                  return (
                    <CustomTableCell
                      key={cell.id}
                      numeric={cell.numeric}
                      padding="checkbox"
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
                      padding="checkbox"
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <Button
                        style={{
                          "text-transform": "none"
                        }}
                        variant={orderBy === cell.id ? "contained" : "outlined"}
                        size="small"
                        color={
                          orderBy === cell.id && orderMean === "good"
                            ? "secondary"
                            : orderBy === cell.id
                            ? "default"
                            : "inherit"
                        }
                        onClick={this.createSortHandler(cell.id)}
                        className={classes.tableButton}
                      >
                        {cell.label}
                      </Button>
                    </CustomTableCellWide>
                  );
                } else {
                  return (
                    <CustomTableCellWide
                      key={cell.id}
                      numeric={cell.numeric}
                      padding="checkbox"
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

CommonTableHeadWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  orderMean: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  head: PropTypes.array.isRequired
};

const CommonTableHead = withStyles(styles)(CommonTableHeadWithoutStyles);

class CommonTableWithoutStyles extends React.Component {
  state = {
    order: this.props.default_order,
    orderBy: this.props.default_orderBy,
    orderMean: "good",
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    var firstOrder = getProperty(this.props.head, property, "defaultOrder");
    var reverseOrder;

    firstOrder === "desc" ? (reverseOrder = "asc") : (reverseOrder = "desc");

    let order = firstOrder;
    let orderMean = "good";

    if (this.state.orderBy === property && this.state.order === firstOrder) {
      order = reverseOrder;
      orderMean = "bad";
    }

    let page = 0;

    this.setState({ order, orderBy, orderMean, page });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event, rowsPerPage) => {
    this.setState({ rowsPerPage: rowsPerPage.key });
  };

  render() {
    const { classes, data, head, row_length, league, main_state } = this.props;
    const { order, orderBy, orderMean, page, rowsPerPage } = this.state;
    var jun = 0;
    var jun2 = 0;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <CommonTableHead
              order={order}
              orderBy={orderBy}
              orderMean={orderMean}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              head={head}
            />
            <MediaQuery query="(max-width: 767px)">
              {stableSort(data, getSorting(order, orderBy)).map(n => {
                if (
                  judgeSearch(main_state, n.選手) ||
                  (!enableSearch(main_state) &&
                    league.indexOf(n.League) >= 0 &&
                    (!getProperty(head, orderBy, "regulated") || n.規定))
                ) {
                  jun++;
                  if (judgePageReturn(row_length, jun, page, rowsPerPage)) {
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
                                  {jun}
                                </CustomTableCellOrder>
                                <CustomTableCellName
                                  colSpan={
                                    Object.keys(n).length - IGNORE_ELEM_NUM
                                  }
                                  numeric="false"
                                  style={
                                    n.規定 || n.チーム || n.球場
                                      ? { color: "black" }
                                      : { color: grey[500] }
                                  }
                                >
                                  {n[value]}
                                </CustomTableCellName>
                              </TableRow>
                            );
                          }
                        })}
                        <TableRow hover tabIndex={-1} key={n.id}>
                          {Object.keys(n).map(value2 => {
                            if (
                              IGNORE_ELEMENTS.indexOf(value2) < 0 &&
                              NARROW_BR_ELEMENTS.indexOf(value2) < 0
                            ) {
                              return (
                                <CustomTableCell
                                  numeric={value2.numeric}
                                  padding="checkbox"
                                  style={
                                    n.規定 || n.チーム || n.球場
                                      ? { color: "black" }
                                      : { color: grey[500] }
                                  }
                                >
                                  {n[value2]}
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
                  if (
                    judgeSearch(main_state, n.選手) ||
                    (!enableSearch(main_state) &&
                      league.indexOf(n.League) >= 0 &&
                      (!getProperty(head, orderBy, "regulated") || n.規定))
                  ) {
                    jun2++;
                    if (judgePageReturn(row_length, jun2, page, rowsPerPage)) {
                      return (
                        <TableRow hover tabIndex={-1} key={n.id}>
                          <CustomTableCellOrderWide
                            numeric="false"
                            padding="checkbox"
                          >
                            {jun2}
                          </CustomTableCellOrderWide>
                          {Object.keys(n).map(value => {
                            if (IGNORE_ELEMENTS.indexOf(value) < 0) {
                              return (
                                <CustomTableCellWide
                                  numeric={value.numeric}
                                  padding="checkbox"
                                  style={
                                    n.規定 || n.チーム || n.球場
                                      ? { color: "black" }
                                      : { color: grey[500] }
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
        {[data].map(n => {
          if (!row_length) {
            return (
              <TablePagination
                component="div"
                count={jun}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
                labelRowsPerPage="人数/ページ"
                page={page}
                backIconButtonProps={{
                  "aria-label": "前ページ"
                }}
                nextIconButtonProps={{
                  "aria-label": "次ページ"
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            );
          }
        })}
      </Paper>
    );
  }
}
CommonTableWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  default_order: PropTypes.string.isRequired,
  default_orderBy: PropTypes.string.isRequired,
  head: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  row_length: PropTypes.number,
  league: PropTypes.string.isRequired,
  main_state: PropTypes.object
};

export const CommonTable = withStyles(styles)(CommonTableWithoutStyles) 
