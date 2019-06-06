import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { LinkTab } from "./Common";

export function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  window: PropTypes.func
};

export function MainAppBar(selected, onChange) {
  return (
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
}

export function LeagueAppBar(className, selected, onChange) {
  return (
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
        <Tab label="セリーグ" />
        <Tab label="パリーグ" />
      </Tabs>
    </AppBar>
  );
}

export function OrderAppBar(className, selected, onChange) {
  return (
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
}
