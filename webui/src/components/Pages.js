import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { LinkTab } from "./Common";

export function HideOnScroll(props) {
  const { children, window, direction } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction={direction} in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func,
  direction: PropTypes.string.isRequired,
};

export const MainAppBar = ({ selected, onChange }) => (
  <AppBar>
    <Tabs
      variant="fullWidth"
      selected={selected}
      value={selected}
      scrollable
      scrollButtons="auto"
      onChange={onChange}
    >
      <Tab label="順位表" />
      <Tab label="野手成績" />
      <Tab label="投手成績" />
      <LinkTab label="BLOG" href="/" />
    </Tabs>
  </AppBar>
);

MainAppBar.propTypes = {
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export const LeagueAppBar = ({ className, selected, onChange }) => (
  <AppBar className={className}>
    <Tabs
      variant="fullWidth"
      selected={selected}
      value={selected}
      indicatorColor="primary"
      textColor="primary"
      scrollable
      scrollButtons="auto"
      onChange={onChange}
    >
      <Tab label="ALL" />
      <Tab label="セリーグ" />
      <Tab label="パリーグ" />
    </Tabs>
  </AppBar>
);

LeagueAppBar.propTypes = {
  className: PropTypes.object.isRequired, 
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export const OrderAppBar = ({ className, selected, onChange }) => (
  <AppBar className={className}>
    <Tabs
      variant="fullWidth"
      selected={selected}
      value={selected}
      indicatorColor="primary"
      textColor="primary"
      scrollable
      scrollButtons="auto"
      onChange={onChange}
    >
      <Tab label="順位表" />
      <Tab label="パークファクター" />
    </Tabs>
  </AppBar>
);

OrderAppBar.propTypes = {
  className: PropTypes.object.isRequired, 
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}
