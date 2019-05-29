import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { teams_header, teams_body, parks_header, parks_body } from "./Records";
import yellow from "@material-ui/core/colors/yellow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
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
  }
});

const CustomTableCellOrder = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    maxWidth: 10,
    zindex: 3
  },
  body: {
    fontSize: 14,
    zindex: 1
  }
}))(TableCell);

const CustomTableCellName = withStyles(theme => ({
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

const CustomTableCellShort = withStyles(theme => ({
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

const CustomTableCell = withStyles(theme => ({
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

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "asc"
    ? (a, b) => a[orderBy] - b[orderBy]
    : (a, b) => b[orderBy] - a[orderBy];
}

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
          <CustomTableCellOrder />
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
                      <CustomTableCellOrder numeric padding="checkbox">
                        {(jun = jun + add)}
                      </CustomTableCellOrder>
                      <CustomTableCellName
                        component="th"
                        scope="head"
                        padding="none"
                      >
                        {n.チーム}
                      </CustomTableCellName>
                      <CustomTableCell numeric padding="none">
                        {n.試合}
                      </CustomTableCell>
                      <CustomTableCell numeric padding="none">
                        {n.勝利}
                      </CustomTableCell>
                      <CustomTableCell numeric padding="none">
                        {n.敗北}
                      </CustomTableCell>
                      <CustomTableCell numeric padding="none">
                        {n.引分}
                      </CustomTableCell>
                      <CustomTableCell numeric padding="none">
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
    order: "desc",
    orderBy: "得点PF",
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
    const { classes, data, head, default_order, default_orderBy } = this.props;
    const { order, orderBy, orderMean } = this.state;
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
              {stableSort(data, getSorting(order, orderBy)).map(n => {
                return (
                  <TableRow hover tabIndex={-1} key={n.id}>
                    <CustomTableCellOrder numeric padding="checkbox">
                      {(jun = jun + add)}
                    </CustomTableCellOrder>
                    {Object.keys(n).map(value => {
                      return(
                      <CustomTableCell numeric padding="none">
                        {n[value]}
                      </CustomTableCell>
                      );
                    })}
                  </TableRow>
                );
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
  data: PropTypes.array.isRequired
};

class DefaultTable extends React.Component {
  render() {
    return (
      <div>
        <p>
          <TeamTable classes="styles" league="Central" />
        </p>
        <p>
          <TeamTable classes="styles" league="Pacific" />
        </p>
        <p>
          <CommonTable
            classes="styles"
            default_order="desc"
            default_orderBy="得点PF"
            head={parks_header}
            data={parks_body}
          />
        </p>
      </div>
    );
  }
}

export default DefaultTable;
