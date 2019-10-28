import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { styles, LinkTab } from "./Common";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';


interface HideOnScrollProps {
  children: React.FC;
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

interface HideOnScrollProps {
  selected: number;
  onChange: (event: any, selected: number) => any;
}

export const MainAppBar: React.FC<HideOnScrollProps> = React.forwardRef((props, ref) => (
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
