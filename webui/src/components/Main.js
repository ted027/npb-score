import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../theme/theme";
import {
  parks_header,
  parks_body,
  teams_header,
  teams_body,
  teams_rec_header,
  teams_rec_body
} from "./datastore/Teams";
import {
  hitters_header,
  hitters_body,
  hitters_header_ops,
  hitters_body_ops,
  hitters_header_woba,
  hitters_body_woba,
  hitters_header_xr,
  hitters_body_xr,
  hitters_header_contact,
  hitters_body_contact,
  hitters_header_power,
  hitters_body_power,
  hitters_header_eye,
  hitters_body_eye,
  hitters_header_steal,
  hitters_body_steal,
  hitters_header_clutch,
  hitters_body_clutch
} from "./datastore/Hitters";
import {
  pitchers_header,
  pitchers_body,
  pitchers_header_whip,
  pitchers_body_whip,
  pitchers_header_qs,
  pitchers_body_qs,
  pitchers_header_kbb,
  pitchers_body_kbb,
  pitchers_header_relief,
  pitchers_body_relief,
  pitchers_header_closer,
  pitchers_body_closer
} from "./datastore/Pitchers";
import { styles } from "./Common";
import { CommonTable } from "./Tables";
import { HideOnScroll, MainAppBar, LeagueAppBar } from "./Pages";
import { top_ad, bottom_ad, middle_ad1, middle_ad2, middle_ad3 } from "./Ad";

const ORDER_VALUE = 0;
const HITTER_VALUE = 1;
const PITCHER_VALUE = 2;

const CENTRAL = 0;
const PACIFIC = 1;

class DefaultPage extends React.Component {
  state = {
    selected: ORDER_VALUE,
    league_selected: CENTRAL,
    league: "Central"
  };

  handleTabChange = (event, selected) => {
    this.setState({ selected });
  };

  handleLeagueChange = (event, league_selected) => {
    var league;
    if (league_selected === CENTRAL) {
      league = "Central";
    } else if (league_selected === PACIFIC) {
      league = "Pacific";
    }

    this.setState({ league_selected, league });
  };

  render() {
    const { classes } = this.props;
    const { selected, league_selected, league } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.tab}>
            <HideOnScroll {...this.props}>
              {MainAppBar(selected, this.handleTabChange)}
            </HideOnScroll>
          </div>
          {selected === ORDER_VALUE && (
            <div className={classes.root}>
              {top_ad(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      セリーグ順位表
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="勝率"
                  head={teams_header}
                  data={teams_body}
                  row_length={teams_body.length}
                  league="Central"
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      パリーグ順位表
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="勝率"
                  head={teams_header}
                  data={teams_body}
                  row_length={teams_body.length}
                  league="Pacific"
                />
              </p>
              {middle_ad2(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      セリーグ投打成績
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="得点"
                  head={teams_rec_header}
                  data={teams_rec_body}
                  row_length={teams_body.length}
                  league="Central"
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      パリーグ投打成績
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="得点"
                  head={teams_rec_header}
                  data={teams_rec_body}
                  row_length={teams_body.length}
                  league="Pacific"
                />
              </p>
              {middle_ad1(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      パークファクター　※参考値
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="得点PF"
                  head={parks_header}
                  data={parks_body}
                  row_length={parks_body.length}
                />
              </p>
            </div>
          )}
          {selected === HITTER_VALUE && (
            <div className={classes.individualRoot}>
              <HideOnScroll {...this.props}>
                {LeagueAppBar(
                  classes.subtab,
                  league_selected,
                  this.handleLeagueChange
                )}
              </HideOnScroll>
              {top_ad(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      野手タイトル
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="打率"
                  head={hitters_header}
                  data={hitters_body}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      打撃力総合１
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="出塁率"
                  head={hitters_header_ops}
                  data={hitters_body_ops}
                  row_length="10"
                  league={league}
                />
              </p>
              {middle_ad2(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      打撃力総合２
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="wOBA"
                  head={hitters_header_woba}
                  data={hitters_body_woba}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      攻撃力総合
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="XR"
                  head={hitters_header_xr}
                  data={hitters_body_xr}
                  row_length="10"
                  league={league}
                />
              </p>
              {middle_ad1(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      ミート
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="asc"
                  default_orderBy="K%"
                  head={hitters_header_contact}
                  data={hitters_body_contact}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      パワー
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="IsoP"
                  head={hitters_header_power}
                  data={hitters_body_power}
                  row_length="10"
                  league={league}
                />
              </p>
              {middle_ad3(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      選球眼
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="BB%"
                  head={hitters_header_eye}
                  data={hitters_body_eye}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      走力
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="wSB"
                  head={hitters_header_steal}
                  data={hitters_body_steal}
                  row_length="10"
                  league={league}
                />
              </p>
              {/* <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      チャンス
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="得点圏打率"
                  head={hitters_header_clutch}
                  data={hitters_body_clutch}
                  row_length="10"
                  league={league}
                />
              </p> */}
            </div>
          )}
          {selected === PITCHER_VALUE && (
            <div className={classes.individualRoot}>
              <HideOnScroll {...this.props}>
                {LeagueAppBar(
                  classes.subtab,
                  league_selected,
                  this.handleLeagueChange
                )}
              </HideOnScroll>
              {top_ad(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      先発投手１
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="asc"
                  default_orderBy="防御率"
                  head={pitchers_header}
                  data={pitchers_body}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      先発投手２
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="asc"
                  default_orderBy="WHIP"
                  head={pitchers_header_whip}
                  data={pitchers_body_whip}
                  row_length="10"
                  league={league}
                />
              </p>
              {middle_ad2(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      先発投手３（三振・四球）
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="K/BB"
                  head={pitchers_header_kbb}
                  data={pitchers_body_kbb}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      先発投手４（ＱＳ・完投）
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="QS率"
                  head={pitchers_header_qs}
                  data={pitchers_body_qs}
                  row_length="10"
                  league={league}
                />
              </p>
              {middle_ad3(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography color="inherit" className={classes.des}>
                      抑え投手
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="セーブ"
                  head={pitchers_header_closer}
                  data={pitchers_body_closer}
                  row_length="10"
                  league={league}
                />
              </p>
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des}>
                      中継ぎ投手
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="HP"
                  head={pitchers_header_relief}
                  data={pitchers_body_relief}
                  row_length="10"
                  league={league}
                />
              </p>
            </div>
          )}
          {bottom_ad(classes)}
        </div>
      </MuiThemeProvider>
    );
  }
}

DefaultPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DefaultPage);
