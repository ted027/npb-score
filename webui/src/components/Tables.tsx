import React from "react";
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
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import {
  stableSort,
  getSorting,
  getProperty,
  judgePageReturn,
  enableSearch,
  judgeSearch
} from "./Common";
import styles from "../styles";
import { strBoolDictWithId } from "../constants";

const IGNORE_ELEMENTS = ["規定", "League"];
const NARROW_BR_ELEMENTS = ["チーム", "選手", "球場"];
const IGNORE_ELEM_NUM = 2;

const CustomTableCellOrder = withStyles(
  (theme: Theme): StyleRules =>
    createStyles({
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
    })
)(TableCell);

const CustomTableCellOrderWide = withStyles(
  (theme: Theme): StyleRules =>
    createStyles({
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
    })
)(TableCell);

const CustomTableCellName = withStyles(
  (theme: Theme): StyleRules =>
    createStyles({
      body: {
        fontSize: 15,
        padding: 1,
        paddingLeft: "7%"
      }
    })
)(TableCell);

const CustomTableCell = withStyles(
  (theme: Theme): StyleRules =>
    createStyles({
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
    })
)(TableCell);

const CustomTableCellWide = withStyles(
  (theme: Theme): StyleRules =>
    createStyles({
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
    })
)(TableCell);

interface TableHeadProps extends WithStyles<typeof styles> {
  onRequestSort: (event: any, property: string) => void;
  order: "asc" | "desc";
  orderBy: string;
  orderMean: "good" | "bad";
  rowCount: number;
  head: { id: string; [key: string]: string | boolean }[];
}

class CommonTableHeadWithoutStyles extends React.Component<TableHeadProps> {
  createSortHandler = (property: string) => (event: any) => {
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
                      padding="checkbox"
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <Button
                        style={{
                          textTransform: "none"
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
                    <CustomTableCell key={cell.id} padding="checkbox">
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
                      padding="checkbox"
                      sortDirection={orderBy === cell.id ? order : false}
                    >
                      <Button
                        style={{
                          textTransform: "none"
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
                    <CustomTableCellWide key={cell.id} padding="checkbox">
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

const CommonTableHead = withStyles(styles)(CommonTableHeadWithoutStyles);

interface TableProps extends WithStyles<typeof styles> {
  default_order: "asc" | "desc";
  default_orderBy: string;
  head: strBoolDictWithId[];
  data: { [key: string]: any }[];
  const_row_length?: number;
  league: "CentralPacific" | "Central" | "Pacific" | "";
  main_state?: { [key: string]: any; searchTeam: string; searchName: string };
}

type TableState = {
  order: "asc" | "desc";
  orderBy: string;
  orderMean: "good" | "bad";
  page: number;
  rowsPerPage: number;
};

class CommonTableWithoutStyles extends React.Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      order: props.default_order,
      orderBy: props.default_orderBy,
      orderMean: "good",
      page: 0,
      rowsPerPage: 5
    };
  }

  handleRequestSort = (event: any, property: string) => {
    const orderBy: string = property;
    var firstOrder = getProperty(this.props.head, property, "defaultOrder");
    var reverseOrder;

    firstOrder === "desc" ? (reverseOrder = "asc") : (reverseOrder = "desc");

    let order = firstOrder;
    let orderMean: "good" | "bad" = "good";

    if (this.state.orderBy === property && this.state.order === firstOrder) {
      order = reverseOrder;
      orderMean = "bad";
    }

    let page = 0;

    this.setState({ order, orderBy, orderMean, page });
  };

  handleChangePage = (event: any, page: number) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // TODO: testing
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
  };

  render() {
    const {
      classes,
      data,
      head,
      const_row_length,
      league,
      main_state
    } = this.props;
    const { order, orderBy, orderMean, page, rowsPerPage } = this.state;
    var jun = 0;
    var jun2 = 0;
    return (
      <Paper>
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
                  // very bad
                  judgeSearch(n.選手, main_state) ||
                  (!enableSearch(main_state) &&
                    league.indexOf(n.League) >= 0 &&
                    (!getProperty(head, orderBy, "regulated") || n.規定))
                ) {
                  jun++;
                  if (
                    judgePageReturn(jun, page, rowsPerPage, const_row_length)
                  ) {
                    return (
                      <TableBody>
                        {Object.keys(n).map(value => {
                          if (NARROW_BR_ELEMENTS.indexOf(value) >= 0) {
                            return (
                              <TableRow
                                hover
                                tabIndex={-1}
                                key={n.id + "_name"}
                              >
                                <CustomTableCellOrder
                                  rowSpan={2}
                                  padding="checkbox"
                                  key={value + "_order"}
                                >
                                  {jun}
                                </CustomTableCellOrder>
                                <CustomTableCellName
                                  colSpan={
                                    Object.keys(n).length - IGNORE_ELEM_NUM
                                  }
                                  style={
                                    n.規定 || n.チーム || n.球場
                                      ? { color: "black" }
                                      : { color: grey[500] }
                                  }
                                  key={value + "_name"}
                                >
                                  {n[value]}
                                </CustomTableCellName>
                              </TableRow>
                            );
                          }
                        })}
                        <TableRow hover tabIndex={-1} key={n.id + "_records"}>
                          {Object.keys(n).map(value2 => {
                            if (
                              IGNORE_ELEMENTS.indexOf(value2) < 0 &&
                              NARROW_BR_ELEMENTS.indexOf(value2) < 0
                            ) {
                              return (
                                <CustomTableCell
                                  padding="checkbox"
                                  style={
                                    n.規定 || n.チーム || n.球場
                                      ? { color: "black" }
                                      : { color: grey[500] }
                                  }
                                  key={value2}
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
                    // very bad
                    judgeSearch(n.選手, main_state) ||
                    (!enableSearch(main_state) &&
                      league.indexOf(n.League) >= 0 &&
                      (!getProperty(head, orderBy, "regulated") || n.規定))
                  ) {
                    jun2++;
                    if (
                      judgePageReturn(jun2, page, rowsPerPage, const_row_length)
                    ) {
                      return (
                        <TableRow hover tabIndex={-1} key={n.id}>
                          <CustomTableCellOrderWide
                            padding="checkbox"
                            key={order}
                          >
                            {jun2}
                          </CustomTableCellOrderWide>
                          {Object.keys(n).map(value => {
                            if (IGNORE_ELEMENTS.indexOf(value) < 0) {
                              return (
                                <CustomTableCellWide
                                  padding="checkbox"
                                  style={
                                    n.規定 || n.チーム || n.球場
                                      ? { color: "black" }
                                      : { color: grey[500] }
                                  }
                                  key={value}
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
          if (!const_row_length) {
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

export const CommonTable = withStyles(styles)(CommonTableWithoutStyles);
