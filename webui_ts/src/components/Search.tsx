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
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from "./Common";
import { teamConverter } from "./datastore/DataCommon";

interface Props extends WithStyles<typeof styles> {
  execSearch: (team: string, name: string) => any;
  resetSearch: (event: any) => any;
  handlePopper: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => any;
  decideTeamText: (event: any) => any;
  decideNameText: (event: any) => any;
}

interface State {
  anchorEl: HTMLDivElement | null;
  open: boolean;
  team: string;
  name: string
}

class SearchContents extends React.Component<Props, State> {
  // fix point
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      team: '',
      name: '',
    };
  }

  render() {
    const {
      classes,
      execSearch,
      resetSearch,
      handlePopper,
      decideTeamText,
      decideNameText
    } = this.props;
    const { anchorEl, open, team, name } = this.state;

    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="top-end"
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
                    onKeyPress={ (ev) => {
                      if (ev.key === 'Enter') {
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
              {/* </ClickAwayListener> */}
            </Fade>
          )}
        </Popper>
        <Fab color="primary" aria-label="Search">
          <SearchIcon onClick={() => handlePopper} />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(SearchContents);
