import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import yellow from "@material-ui/core/colors/yellow";
import { teams_header, teams_body } from "./datastore/Teams";
import { stableSort, getSorting, getProperty } from "./Common";

const IGNORE_ELEMENTS = ["規定", "League"];

const CustomTableCellOrder = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 11,
    maxWidth: 7,
    zindex: 3
  },
  body: {
    fontSize: 10,
    maxWidth: 7,
    zindex: 1
  }
}))(TableCell);

// const CustomTableCellName = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//     maxWidth: 90,
//     zindex: 3
//   },
//   body: {
//     fontSize: 14,
//     maxWidth: 90,
//     zindex: 1
//   }
// }))(TableCell);

// const CustomTableCellShort = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//     minWidth: 24,
//     zindex: 2
//   },
//   body: {
//     fontSize: 14,
//     zindex: 0
//   }
// }))(TableCell);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 11,
    minWidth: 40,
    zindex: 2
  },
  body: {
    fontSize: 12,
    minWidth: 40,
    zindex: 0
  }
}))(TableCell);

const CustomTableSortLabel = withStyles({
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

class TeamTableHead extends React.Component {
  render() {
    const { head } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCellOrder padding="checkbox" />
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

export class TeamTable extends React.Component {
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
                if (n.League === league) {
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <CustomTableCellOrder numeric="false" padding="checkbox">
                        {(jun = jun + add)}
                      </CustomTableCellOrder>
                      <CustomTableCell
                        component="th"
                        scope="head"
                        padding="none"
                      >
                        {n.チーム}
                      </CustomTableCell>
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

class CommonTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, head } = this.props;

    return (
      <TableHead>
        <TableRow>
          <CustomTableCellOrder padding="checkbox" />
          {head.map(cell => {
            if (IGNORE_ELEMENTS.indexOf(cell.id) < 0) {
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
    var add = 1;
    var row_count = 0;
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
              {stableSort(data, getSorting(order, orderBy)).map(n => {
                if (n.League === league && row_count < row_length) {
                  if (!getProperty(head, orderBy, "regulated") || n.規定) {
                    {
                      row_count++;
                    }
                    return (
                      <TableRow hover tabIndex={-1} key={n.id}>
                        <CustomTableCellOrder
                          numeric="false"
                          padding="checkbox"
                        >
                          {(jun = jun + add)}
                        </CustomTableCellOrder>
                        {Object.keys(n).map(value => {
                          if (IGNORE_ELEMENTS.indexOf(value) < 0) {
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
