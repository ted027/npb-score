import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import MediaQuery from "react-responsive";
import Slide from "@material-ui/core/Slide";
import { LinkTab } from "./Common";
import styles from "../styles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import TableChartIcon from "@material-ui/icons/TableChart";
import SportsCricketIcon from "@material-ui/icons/SportsCricket";
import SportsBaseballIcon from "@material-ui/icons/SportsBaseball";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

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

interface MainAppBarProps extends WithStyles<typeof styles> {
  selected: number;
  onSelectRecords: (event: any, selected: number) => any;
}

export const MainAppBarWithoutStyles: React.FC<MainAppBarProps> = React.forwardRef(
  (props, ref) => (
    <AppBar className={props.classes.tab} ref={ref}>
      <MediaQuery query="(max-width: 767px)">
        <Tabs
          variant="fullWidth"
          value={props.selected}
          onChange={props.onSelectRecords}
        >
          <Tab icon={<TableChartIcon />} label="順位表" />
          <Tab icon={<SportsCricketIcon />} label="野手成績" />
          <Tab icon={<SportsBaseballIcon />} label="投手成績" />
          <LinkTab icon={<KeyboardReturnIcon />} label="BLOG" href="/" />
        </Tabs>
      </MediaQuery>
      <MediaQuery query="(min-width: 767px)">
        <Tabs value={props.selected} onChange={props.onSelectRecords}>
          <Tab icon={<TableChartIcon />} label="順位表" />
          <Tab icon={<SportsCricketIcon />} label="野手成績" />
          <Tab icon={<SportsBaseballIcon />} label="投手成績" />
          <LinkTab icon={<KeyboardReturnIcon />} label="BLOG" href="/" />
        </Tabs>
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
