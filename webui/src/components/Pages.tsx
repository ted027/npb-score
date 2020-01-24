import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { styles, LinkTab, years_list } from "./Common";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';


interface HideOnScrollProps {
  children: JSX.Element;
  direction: 'up' | 'down';
}

export const HideOnScroll: React.FC<HideOnScrollProps> = ({ children, direction }) => {
  const trigger = useScrollTrigger({ target: undefined });
  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
}

interface MainAppBarProps {
  selected: number;
  onChange: (event: any, selected: number) => any;
}

export const MainAppBar: React.FC<MainAppBarProps> = React.forwardRef((props, ref) => (
  <AppBar ref={ref}>
    <Tabs
      variant="fullWidth"
      value={props.selected}
      scrollButtons="auto"
      onChange={props.onChange}
    >
      <Tab label="順位表" />
      <Tab label="野手成績" />
      <Tab label="投手成績" />
      <LinkTab label="BLOG" href="/" />
    </Tabs>
  </AppBar>
));

interface LeagueAppBarProps extends WithStyles<typeof styles> {
  selected: number;
  onChange: (event: any, selected: number) => any;
}

const LeagueAppBarWithoutStyles: React.FC<LeagueAppBarProps> = React.forwardRef((props, ref) => (
  <AppBar className={props.classes.subtab} ref={ref}>
    <Tabs
      variant="fullWidth"
      value={props.selected}
      indicatorColor="primary"
      textColor="primary"
      scrollButtons="auto"
      onChange={props.onChange}
    >
      <Tab label="ALL" />
      <Tab label="セリーグ" />
      <Tab label="パリーグ" />
    </Tabs>
  </AppBar>
));

export const LeagueAppBar = withStyles(styles)(LeagueAppBarWithoutStyles);

interface OrderAppBarProps extends WithStyles<typeof styles> {
  selected: number;
  onChange: (event: any, selected: number) => any;
}

const OrderAppBarWithoutStyles: React.FC<OrderAppBarProps> = React.forwardRef((props, ref) => (
  <AppBar className={props.classes.subtab} ref={ref}>
    <Tabs
      variant="fullWidth"
      value={props.selected}
      indicatorColor="primary"
      textColor="primary"
      scrollButtons="auto"
      onChange={props.onChange}
    >
      <Tab label="順位表" />
      <Tab label="パークファクター" />
    </Tabs>
  </AppBar>
));

export const OrderAppBar = withStyles(styles)(OrderAppBarWithoutStyles);

interface yearsState {
  year_selected: number
}

interface selectYearBarProps extends WithStyles<typeof styles> {
  yearsState: yearsState;
  onChange: (event: any) => any;
}

const selectYearBarWithoutStyles: React.FC<selectYearBarProps> = React.forwardRef((props, ref) => (
  // TODO: fix class name
  <AppBar className={props.classes.XXXXX} ref={ref}>
    <form noValidate autoComplete="off">
      <TextField
        id="filled-select-year"
        select
        label="年"
        className={props.classes.textField}
        value={props.yearsState.year_selected}
        onChange={props.onChange}
        variant="outlined"
        margin="normal"
        defaultValue={years_list.slice(-1)[0]}
      >
        {years_list.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
    </form>
  </AppBar>
));

export const SelectYearBar = withStyles(styles)(selectYearBarWithoutStyles);
