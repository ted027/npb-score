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

// export class HideOnScroll extends React.Component {
//   render() {
//     const { children, direction } = this.props;
//     const trigger = useScrollTrigger({ target: undefined });
    
//     return (
//       <Slide appear={false} direction={direction} in={!trigger}>
//         {children}
//       </Slide>
//     );
//   }
// }

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string.isRequired
};

export const MainAppBar = ({ selected, onChange }) => (
  <AppBar>
    <Tabs
      variant="fullWidth"
      selected={selected}
      value={selected}
      variant="fullWidth"
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
};

const LeagueAppBarWithoutStyles = ({ classes, selected, onChange }) => (
  <AppBar className={classes.subtab}>
    <Tabs
      variant="fullWidth"
      selected={selected}
      value={selected}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      scrollButtons="auto"
      onChange={onChange}
    >
      <Tab label="ALL" />
      <Tab label="セリーグ" />
      <Tab label="パリーグ" />
    </Tabs>
  </AppBar>
);

LeagueAppBarWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export const LeagueAppBar = withStyles(styles)(LeagueAppBarWithoutStyles);

const OrderAppBarWithoutStyles = ({ classes, selected, onChange }) => (
  <AppBar className={classes.subtab}>
    <Tabs
      variant="fullWidth"
      selected={selected}
      value={selected}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      scrollButtons="auto"
      onChange={onChange}
    >
      <Tab label="順位表" />
      <Tab label="パークファクター" />
    </Tabs>
  </AppBar>
);

OrderAppBarWithoutStyles.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export const OrderAppBar = withStyles(styles)(OrderAppBarWithoutStyles);
