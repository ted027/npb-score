import React from "react";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../../theme";
import styles from "../../styles";
import { HideOnScroll } from "../Pages";
import { VisibleMainAppBar } from "../../containers/changeTab";
import { bottom_ad, middle_ad2 } from "../Ad";
import { selectYears, MainPageIf, YearsIf } from "../../constants";
import Order from "./Order";
import Hitter from "./Hitter";
import Pitcher from "./Pitcher";

const ORDER_VALUE = 0;
const HITTER_VALUE = 1;
const PITCHER_VALUE = 2;

interface yearState {
  year_selected: selectYears;
}

export interface MainProps extends WithStyles<typeof styles> {
  pageState: MainPageIf;
  yearState: YearsIf;
}

class MainApp extends React.Component<MainProps> {
  render() {
    const { classes, pageState } = this.props;
    const { selected } = pageState;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div>
            <HideOnScroll {...this.props} direction="down">
              <VisibleMainAppBar selected={selected} />
            </HideOnScroll>
          </div>
          {selected === ORDER_VALUE && <Order {...this.props} />}
          {selected === HITTER_VALUE && <Hitter {...this.props} />}
          {selected === PITCHER_VALUE && <Pitcher {...this.props} />}
          {middle_ad2(classes)}
          {bottom_ad(classes)}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(MainApp);
