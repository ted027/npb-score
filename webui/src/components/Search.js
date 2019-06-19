import React from "react";
import PropTypes from "prop-types";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { teamConverter } from "./datastore/DataCommon";

export class SearchContents extends React.Component {
  state = {
    anchorEl: null,
    open: false,
    placement: null,
    team: "",
    name: ""
  };

  handleSearchPopper = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  handleDecideText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSearchExec = (team, name) => event => {
    this.setState({ open: false });
    return this.props.search_func(team, name);
  };

  handleReset = event => {
    this.setState({ open: false, team: "", name: "" });
    return this.props.search_func("", "");
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open, placement } = this.state;

    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={30}>
              {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
              <Paper>
                <form noValidate autoComplete="off">
                  <TextField
                    id="filled-select-team"
                    select
                    label="Team"
                    className={classes.textField}
                    value={this.state.team}
                    onChange={this.handleDecideText("team")}
                    SelectProps={{
                      MenuProps: {
                        native: true
                      }
                    }}
                    margin="normal"
                    variant="filled"
                  >
                    {Object.keys(teamConverter).map(shortTeam => (
                      <MenuItem key={shortTeam} value={shortTeam}>
                        {shortTeam}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
                <form
                  className={classes.container}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="filled-name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleDecideText("name")}
                    margin="normal"
                    variant="filled"
                  />
                </form>
                <Toolbar>
                  <Paper>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.resetButton}
                      onClick={this.handleReset}
                    >
                      Reset
                    </Button>
                  </Paper>
                  <Paper>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.searchButton}
                      disabled={
                        this.state.team || this.state.name ? false : true
                      }
                      onClick={this.handleSearchExec(
                        this.state.team,
                        this.state.name
                      )}
                    >
                      Search
                    </Button>
                  </Paper>
                </Toolbar>
              </Paper>
              {/* </ClickAwayListener> */}
            </Fade>
          )}
        </Popper>
        <Fab color="primary" aria-label="Search" className={classes.fab}>
          <SearchIcon onClick={this.handleSearchPopper("top-end")} />
        </Fab>
      </div>
    );
  }
}

SearchContents.propTypes = {
  classes: PropTypes.object.isRequired,
  search_func: PropTypes.func.isRequired
};
