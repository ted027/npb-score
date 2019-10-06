import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { styles, LinkTab } from "./Common";
import { withStyles } from "@material-ui/styles";

export const HideOnScroll = ({ children, direction }) => {
  const trigger = useScrollTrigger({ target: undefined });
  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string.isRequired
};

export const MainAppBar = React.forwardRef((props, ref) => (
  <AppBar ref={ref}>
    <Tabs
      variant="fullWidth"
      selected={props.selected}
      value={props.selected}
      scrollButtons="auto"
      onChange={props.onChange}
    >
      <LinkTab label="順位表" href="?category=order" />
      <LinkTab label="野手成績" href="?category=hitter" />
      <LinkTab label="投手成績" href="?category=pitcher" />
      <LinkTab label="BLOG" href="/" />
    </Tabs>
  </AppBar>
));

MainAppBar.propTypes = {
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const LeagueAppBarWithoutStyles = React.forwardRef((props, ref) => (
  <AppBar className={props.classes.subtab} ref={ref}>
    <Tabs
      variant="fullWidth"
      selected={props.selected}
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

LeagueAppBarWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export const LeagueAppBar = withStyles(styles)(LeagueAppBarWithoutStyles);

const OrderAppBarWithoutStyles = React.forwardRef((props, ref) => (
  <AppBar className={props.classes.subtab} ref={ref}>
    <Tabs
      variant="fullWidth"
      selected={props.selected}
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

OrderAppBarWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export const OrderAppBar = withStyles(styles)(OrderAppBarWithoutStyles);
