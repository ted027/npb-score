import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { years_list } from "./Common";
import styles from "../styles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { yearState } from "../constants";
import {
  FormControl,
  Select,
  Popper,
  Paper,
  Fade,
  Fab
} from "@material-ui/core";
import { HideOnScroll } from "./Pages";
import SettingsIcon from "@material-ui/icons/Settings";

interface SelectYearFormProps extends WithStyles<typeof styles> {
  yearState: yearState;
  onSelectYear: (event: any) => any;
}

const SelectYearFormWithoutStyles: React.FC<SelectYearFormProps> = props => (
  <FormControl className={props.classes.selectYear}>
    <Select
      id="filled-select-year"
      value={props.yearState.year_selected}
      onChange={props.onSelectYear}
      defaultValue={years_list.slice(-1)[0]}
    >
      <MenuItem value="" disabled>
        年
      </MenuItem>
      {years_list.map(year => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export const SelectYearForm = withStyles(styles)(SelectYearFormWithoutStyles);

interface PopperState {
  anchorEl: HTMLDivElement | null;
  open: boolean;
}

interface SelectYearPopperProps extends SelectYearFormProps {
  popperState: PopperState;
  handlePopper: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => any;
}

export class SelectYearPopper extends React.Component<SelectYearPopperProps> {
  render() {
    const {
      yearState,
      popperState,
      onSelectYear,
      handlePopper
    } = this.props;
    // const { year_selected } = yearState;
    const { anchorEl, open } = popperState;

    return (
      <div>
        <Popper open={open} anchorEl={anchorEl} placement="top-end" transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={30}>
              {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
              <HideOnScroll direction="up">
                <Paper>
                  <SelectYearForm
                    onSelectYear={onSelectYear}
                    yearState={yearState}
                  />
                </Paper>
              </HideOnScroll>
              {/* </ClickAwayListener> */}
            </Fade>
          )}
        </Popper>
        <Fab color="secondary" aria-label="Search">
          <SettingsIcon onClick={handlePopper} />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(SelectYearPopper);
