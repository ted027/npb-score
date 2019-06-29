import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { styles } from "./Common";
import { teamConverter } from "./datastore/DataCommon";

class SearchContents extends React.Component {

  render() {
    const { classes, searchState, execSearch, resetSearch, handlePopper, decideTeamText, decideNameText } = this.props;
    const { anchorEl, open, placement, team, name } = searchState;

    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
          style={{ zIndex: 20 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={30}>
              {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
              <Paper>
                <form noValidate autoComplete="off">
                  <TextField
                    id="filled-select-team"
                    select
                    label="チーム"
                    className={classes.textField}
                    value={team}
                    onChange={() => decideTeamText()}
                    variant="outlined"
                    fullWidth="true"
                    margin="normal"
                  >
                    {Object.keys(teamConverter).map(shortTeam => (
                      <MenuItem key={shortTeam} value={shortTeam}>
                        {shortTeam}
                      </MenuItem>
                    ))}
                  </TextField>
                </form>
                <form noValidate autoComplete="off">
                  <TextField
                    id="filled-name"
                    label="選手名"
                    className={classes.textField}
                    value={name}
                    onChange={() => decideNameText()}
                    variant="outlined"
                    fullWidth="true"
                    margin="normal"
                  />
                </form>
                <Toolbar>
                  <Toolbar className={classes.resetButton}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.resetButton}
                      onClick={() => resetSearch()}
                    >
                      リセット
                    </Button>
                  </Toolbar>
                  <Toolbar className={classes.searchButton}>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.searchButton}
                      disabled={
                        team || name ? false : true
                      }
                      onClick={() => execSearch(team, name)}
                    >
                      検索
                    </Button>
                  </Toolbar>
                </Toolbar>
              </Paper>
              {/* </ClickAwayListener> */}
            </Fade>
          )}
        </Popper>
        <Fab color="primary" aria-label="Search" className={classes.fab}>
          <SearchIcon onClick={() => handlePopper("top-end")} />
        </Fab>
      </div>
    );
  }
}

SearchContents.propTypes = {
  classes: PropTypes.object.isRequired,
  searchState: PropTypes.arrayOf(
    PropTypes.shape({
      anchorEl: PropTypes.object.isRequired,
      open: PropTypes.bool.isRequired,
      placement: PropTypes.object.isRequired,
      team: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
    ).isRequired,
  execSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  handlePopper: PropTypes.func.isRequired,
  decideTeamText: PropTypes.func.isRequired,
  decideNameText: PropTypes.func.isRequired,
};

export default withStyles(styles)(SearchContents);
