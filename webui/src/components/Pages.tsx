import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuItem from "@material-ui/core/MenuItem";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MediaQuery from "react-responsive";
import Slide from "@material-ui/core/Slide";
import { LinkTab, years_list } from "./Common";
import styles from "../styles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { selectYears } from "../constants";
import { FormControl, Select, InputLabel, Toolbar } from "@material-ui/core";

interface HideOnScrollProps {
  children: JSX.Element;
  direction: "up" | "down";
}

export const HideOnScroll: React.FC<HideOnScrollProps> = ({
  children,
  direction
}) => {
  const trigger = useScrollTrigger({ target: undefined });
  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
};

interface yearState {
  year_selected: selectYears;
}

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

const SelectYearForm = withStyles(styles)(SelectYearFormWithoutStyles);

interface MainAppBarProps extends WithStyles<typeof styles> {
  selected: number;
  yearState: yearState;
  onSelectRecords: (event: any, selected: number) => any;
  onSelectYear: (event: any) => any;
}

export const MainAppBarWithoutStyles: React.FC<MainAppBarProps> = React.forwardRef(
  (props, ref) => (
    <AppBar className={props.classes.tab} ref={ref}>
      <MediaQuery query="(max-width: 767px)">
        <Tabs
          value={props.selected}
          onChange={props.onSelectRecords}
        >
          <Tab label="順位表" />
          <Tab label="野手成績" />
          <Tab label="投手成績" />
        </Tabs>
        <SelectYearForm
          onSelectYear={props.onSelectYear}
          yearState={props.yearState}
        />
      </MediaQuery>
      <MediaQuery query="(min-width: 767px)">
        <Tabs value={props.selected} onChange={props.onSelectRecords}>
          <Tab label="順位表" />
          <Tab label="野手成績" />
          <Tab label="投手成績" />
          <LinkTab label="BLOG" href="/" />
        </Tabs>
        <SelectYearForm
          onSelectYear={props.onSelectYear}
          yearState={props.yearState}
        />
      </MediaQuery>
    </AppBar>
  )
);

export const MainAppBar = withStyles(styles)(MainAppBarWithoutStyles);

interface LeagueAppBarProps extends WithStyles<typeof styles> {
  selected: number;
  onChange: (event: any, selected: number) => any;
}

const LeagueAppBarWithoutStyles: React.FC<LeagueAppBarProps> = React.forwardRef(
  (props, ref) => (
    <AppBar className={props.classes.subtab} ref={ref}>
      <MediaQuery query="(max-width: 767px)">
        <Tabs
          variant="fullWidth"
          value={props.selected}
          indicatorColor="primary"
          textColor="primary"
          onChange={props.onChange}
        >
          <Tab label="ALL" />
          <Tab label="セリーグ" />
          <Tab label="パリーグ" />
        </Tabs>
      </MediaQuery>
      <MediaQuery query="(min-width: 767px)">
        <Tabs
          value={props.selected}
          indicatorColor="primary"
          textColor="primary"
          onChange={props.onChange}
        >
          <Tab label="ALL" />
          <Tab label="セリーグ" />
          <Tab label="パリーグ" />
        </Tabs>
      </MediaQuery>
    </AppBar>
  )
);

export const LeagueAppBar = withStyles(styles)(LeagueAppBarWithoutStyles);

interface OrderAppBarProps extends WithStyles<typeof styles> {
  selected: number;
  onChange: (event: any, selected: number) => any;
}

const OrderAppBarWithoutStyles: React.FC<OrderAppBarProps> = React.forwardRef(
  (props, ref) => (
    <AppBar className={props.classes.subtab} ref={ref}>
      <MediaQuery query="(max-width: 767px)">
        <Tabs
          variant="fullWidth"
          value={props.selected}
          indicatorColor="primary"
          textColor="primary"
          onChange={props.onChange}
        >
          <Tab label="順位表" />
          <Tab label="パークファクター" />
        </Tabs>
      </MediaQuery>
      <MediaQuery query="(min-width: 767px)">
        <Tabs
          value={props.selected}
          indicatorColor="primary"
          textColor="primary"
          onChange={props.onChange}
        >
          <Tab label="順位表" />
          <Tab label="パークファクター" />
        </Tabs>
      </MediaQuery>
    </AppBar>
  )
);

export const OrderAppBar = withStyles(styles)(OrderAppBarWithoutStyles);
