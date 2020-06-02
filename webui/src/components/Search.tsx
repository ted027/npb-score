import * as React from "react";
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
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import styles from "../styles";
import { teamConverter } from "../datastore/DataCommon";
import { HideOnScroll } from "./Pages";
import { SearchIf } from "../constants";

interface Props extends WithStyles<typeof styles> {
  searchState: SearchIf;
  execSearch: (team: string, name: string) => any;
  resetSearch: (event: any) => any;
  handlePopper: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => any;
  decideTeamText: (event: any) => any;
  decideNameText: (event: any) => any;
}

class SearchContents extends React.Component<Props> {
  render() {
    const {
      classes,
      searchState,
      execSearch,
      resetSearch,
      handlePopper,
      decideTeamText,
      decideNameText
    } = this.props;
    const { anchorEl, open, team, name } = searchState;

    return (
      <div>
        <Popper open={open} anchorEl={anchorEl} placement="top-end" transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={20}>
              {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
              <HideOnScroll direction="up">
                <Paper className={classes.popPaper}>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="filled-select-team"
                      select
                      label="チーム"
                      className={classes.textField}
                      value={team}
                      onChange={decideTeamText}
                      variant="outlined"
                      fullWidth={true}
                      margin="normal"
                    >
                      {Object.keys(teamConverter).map(shortTeam => (
                        <MenuItem key={shortTeam} value={shortTeam}>
                          {shortTeam}
                        </MenuItem>
                      ))}
                    </TextField>
                  </form>
                  <form autoComplete="off">
                    <TextField
                      id="filled-name"
                      label="選手名"
                      className={classes.textField}
                      value={name}
                      onChange={decideNameText}
                      onKeyPress={ev => {
                        if (ev.key === "Enter") {
                          ev.preventDefault();
                          execSearch(team, name);
                        }
                      }}
                      variant="outlined"
                      fullWidth={true}
                      margin="normal"
                    />
                  </form>
                  <Toolbar>
                    <Toolbar className={classes.resetButton}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.resetButton}
                        onClick={resetSearch}
                      >
                        リセット
                      </Button>
                    </Toolbar>
                    <Toolbar className={classes.searchButton}>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.searchButton}
                        disabled={team || name ? false : true}
                        onClick={() => execSearch(team, name)}
                      >
                        検索
                      </Button>
                    </Toolbar>
                  </Toolbar>
                </Paper>
              </HideOnScroll>
              {/* </ClickAwayListener> */}
            </Fade>
          )}
        </Popper>
        <Fab color="primary" aria-label="Search" className={classes.commonFab}>
          <SearchIcon onClick={handlePopper} />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(SearchContents);
