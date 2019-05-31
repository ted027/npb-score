import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { teams_header, teams_body, parks_header, parks_body } from "./Records";
import { hitters_header_award, hitters_body_award } from "./Records";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {
  styles,
  LinkTab,
  CustomTableCellOrder,
  CustomTableCellShort,
  CustomTableCellName,
  CustomTableCell,
  CustomTableSortLabel,
  stableSort,
  getSorting
} from "./Common";

const ORDER_VALUE = 0;
const HITTER_VALUE = 1;

const CENTRAL = 0;
const PACIFIC = 1;

class TeamTableHead extends React.Component {
  render() {
    const { head } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCellOrder />
          {head.map(cell => {
            return (
              <CustomTableCell
                key={cell.id}
                numeric={cell.numeric}
                padding={cell.disablePadding ? "checkbox" : "none"}
              >
                {cell.label}
              </CustomTableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

TeamTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
  head: PropTypes.array.isRequired
};

class CommonTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, onRequestSort, rowCount, head } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCellOrder numeric="false" />
          {head.map(cell => {
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
          }, this)}
        </TableRow>
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

class TeamTable extends React.Component {
  state = {
    order: "desc",
    orderBy: "勝率",
    head: teams_header,
    data: teams_body
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    var firstOrder = "desc";

    let order = firstOrder;
    let orderMean = "good";

    this.setState({ order, orderBy, orderMean });
  };

  render() {
    const { classes, league } = this.props;
    const { data, order, orderBy, head } = this.state;
    var jun = 0;
    var add = 1;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TeamTableHead rowCount={data.length} head={head} />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy)).map(n => {
                if (n.League == league) {
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <CustomTableCellOrder numeric="true" padding="checkbox">
                        {(jun = jun + add)}
                      </CustomTableCellOrder>
                      <CustomTableCellName
                        component="th"
                        scope="head"
                        padding="none"
                      >
                        {n.チーム}
                      </CustomTableCellName>
                      <CustomTableCell numeric="true" padding="none">
                        {n.試合}
                      </CustomTableCell>
                      <CustomTableCell numeric="true" padding="none">
                        {n.勝利}
                      </CustomTableCell>
                      <CustomTableCell numeric="true" padding="none">
                        {n.敗北}
                      </CustomTableCell>
                      <CustomTableCell numeric="true" padding="none">
                        {n.引分}
                      </CustomTableCell>
                      <CustomTableCell numeric="true" padding="none">
                        {n.勝率}
                      </CustomTableCell>
                      <CustomTableCell padding="none">{n.差}</CustomTableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

TeamTable.propTypes = {
  classes: PropTypes.object.isRequired,
  league: PropTypes.string.isRequired
};

class CommonTable extends React.Component {
  state = {
    order: this.props.default_order,
    orderBy: this.props.default_orderBy,
    orderMean: "good"
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    var firstOrder;
    var reverseOrder;

    firstOrder = "desc";
    reverseOrder = "asc";

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
    const { order, orderBy, orderMean } = this.state;
    var ignore_elements = ["規定", "League"];
    var jun;
    var add;
    if (orderMean === "bad") {
      jun = data.length + 1;
      add = -1;
    } else {
      jun = 0;
      add = 1;
    }
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
            <TableBody>
              {stableSort(
                data,
                getSorting(order, orderBy)
              ).slice(0, this.props.row_length).map(n => {
                if (n.League === league) {
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <CustomTableCellOrder numeric="false" padding="checkbox">
                        {(jun = jun + add)}
                      </CustomTableCellOrder>
                      {Object.keys(n).map(value => {
                        if (!(value in ignore_elements)) {
                          return (
                            <CustomTableCell numeric="true" padding="none">
                              {n[value]}
                            </CustomTableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                }
              })}
            </TableBody>
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

class DefaultPage extends React.Component {
  state = {
    selected: ORDER_VALUE,
    league_selected: CENTRAL,
    league: "Central"
  };

  handleTabChange = (event, selected) => {
    this.setState({ selected });
  };

  handleLeagueChange = (event, league_selected) => {
    var league;
    if (league_selected === CENTRAL) {
      league = "Central"
    } else if (league_selected === PACIFIC) {
      league = "Pacific"
    }

    this.setState({ league_selected, league });
  };

  render() {
    const { classes } = this.props;
    const { selected } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.tab}>
          <AppBar position="static">
            <Tabs
              variant="fullWidth"
              selected={selected}
              scrollable
              scrollButtons="auto"
              onChange={this.handleTabChange}
            >
              <Tab label="順位表/PF" />
              <Tab label="野手成績" />
              <LinkTab label="BLOG" href="/" />
            </Tabs>
          </AppBar>
        </div>
        {selected === ORDER_VALUE && (
          <div className={classes.root}>
            <p>
              <TeamTable classes="styles" league="Central" />
            </p>
            <p>
              <TeamTable classes="styles" league="Pacific" />
            </p>
            <p>
              <CommonTable
                classes={styles}
                default_order="desc"
                default_orderBy="得点PF"
                head={parks_header}
                data={parks_body}
                row_length={parks_body.length}
                league="True"
              />
            </p>
          </div>
        )}
        {selected === HITTER_VALUE && (
          <div className={classes.root}>
            <div className={classes.tab}>
              <AppBar position="static">
                <Tabs
                  variant="fullWidth"
                  selected={league_selected}
                  scrollable
                  scrollButtons="auto"
                  onChange={this.handleLeagueChange}
                >
                  <Tab label="CENTRAL" />
                  <Tab label="PACIFIC" />
                </Tabs>
              </AppBar>
            </div>
            <p>
              <CommonTable
                classes={styles}
                default_order="desc"
                default_orderBy="打率"
                head={hitters_header_award}
                data={hitters_body_award}
                row_length="10"
                league={this.state.league}
              />
            </p>
          </div>
        )}
      </div>
    );
  }
}

DefaultPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DefaultPage);
