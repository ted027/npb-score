import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { years_list } from "./Common";
import styles from "../styles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { YearsIf } from "../constants";
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
  yearState: YearsIf;
  onSelectYear: (event: any) => any;
}

const SelectYearFormWithoutStyles: React.FC<SelectYearFormProps> = React.forwardRef(
  (props, ref) => (
    <FormControl>
      <Select
        id="filled-select-year"
        value={props.yearState.year_selected}
        onChange={props.onSelectYear}
        defaultValue={years_list.slice(-1)[0]}
        ref={ref}
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
  )
);

export const SelectYearForm = withStyles(styles)(SelectYearFormWithoutStyles);

interface SelectYearPopperProps extends WithStyles<typeof styles> {
  yearState: YearsIf;
  onSelectYear: (event: any) => any;
  yearHandlePopper: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => any;
}

class SelectYearPopperWithoutStyles extends React.Component<
  SelectYearPopperProps
> {
  render() {
    const { classes, yearState, onSelectYear, yearHandlePopper } = this.props;
    const { anchorEl, open } = yearState;

    return (
      <div>
        <Popper open={open} anchorEl={anchorEl} placement="top-end" transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={20}>
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
        <Fab color="default" aria-label="Search">
          <SettingsIcon onClick={yearHandlePopper} />
        </Fab>
      </div>
    );
  }
}

export const SelectYearPopper = withStyles(styles)(
  SelectYearPopperWithoutStyles
);
