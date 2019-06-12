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
  parks_total_body,
  teams_header,
  teams_body,
  teams_atk_header,
  teams_atk_body,
  teams_def_header,
  teams_def_body
} from "./datastore/Teams";
import {
  hitters_sabr_header,
  hitters_sabr_body,
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
  hitters_body_clutch,
  hitters_header_oth,
  hitters_body_oth
} from "./datastore/Hitters";
import {
  pitchers_sabr_header,
  pitchers_sabr_body,
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
  pitchers_body_closer,
  pitchers_header_oth,
  pitchers_body_oth
} from "./datastore/Pitchers";
import { styles } from "./Common";
import { CommonTable } from "./Tables";
import { HideOnScroll, MainAppBar, LeagueAppBar, OrderAppBar } from "./Pages";
import { top_ad, bottom_ad, middle_ad1, middle_ad2, middle_ad3 } from "./Ad";

const ORDER_VALUE = 0;
const HITTER_VALUE = 1;
const PITCHER_VALUE = 2;

const ORDER = 0;
const PARKFACTOR = 1;

const ALL = 0;
const CENTRAL = 1;
const PACIFIC = 2;

class DefaultPage extends React.Component {
  state = {
    selected: ORDER_VALUE,
    order_selected: ORDER,
    league_selected: ALL,
    league: "CentralPacific"
  };

  handleTabChange = (event, selected) => {
    this.setState({ selected });
  };

  handleTeamOrderChange = (event, order_selected) => {
    this.setState({ order_selected });
  };

  handleLeagueChange = (event, league_selected) => {
    var league;
    if (league_selected === ALL) {
      league = "CentralPacific";
    } else if (league_selected === CENTRAL) {
      league = "Central";
    } else if (league_selected === PACIFIC) {
      league = "Pacific";
    }

    this.setState({ league_selected, league });
  };

  render() {
    const { classes } = this.props;
    const { selected, league_selected, league, order_selected } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div className={classes.tab}>
            <HideOnScroll {...this.props}>
              {MainAppBar(selected, this.handleTabChange)}
            </HideOnScroll>
          </div>
          {selected === ORDER_VALUE && (
            <div className={classes.individualRoot}>
              <HideOnScroll {...this.props}>
                {OrderAppBar(
                  classes.subtab,
                  order_selected,
                  this.handleTeamOrderChange
                )}
              </HideOnScroll>
              {top_ad(classes)}
              {order_selected === ORDER && (
                <p>
                  <p>
                    <AppBar
                      position="static"
                      color="default"
                      className={classes.des}
                    >
                      <Toolbar variant="dense">
                        <Typography variant="h6" className={classes.des2}>
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
                        <Typography variant="h6" className={classes.des2}>
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
                        <Typography variant="h6" className={classes.des2}>
                          セリーグ野手成績
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <CommonTable
                      classes={styles}
                      default_order="desc"
                      default_orderBy="得点"
                      head={teams_atk_header}
                      data={teams_atk_body}
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
                        <Typography variant="h6" className={classes.des2}>
                          パリーグ野手成績
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <CommonTable
                      classes={styles}
                      default_order="desc"
                      default_orderBy="得点"
                      head={teams_atk_header}
                      data={teams_atk_body}
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
                        <Typography variant="h6" className={classes.des2}>
                          セリーグ投手成績
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <CommonTable
                      classes={styles}
                      default_order="asc"
                      default_orderBy="失点"
                      head={teams_def_header}
                      data={teams_def_body}
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
                        <Typography variant="h6" className={classes.des2}>
                          パリーグ投手成績
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <CommonTable
                      classes={styles}
                      default_order="asc"
                      default_orderBy="失点"
                      head={teams_def_header}
                      data={teams_def_body}
                      row_length={teams_body.length}
                      league="Pacific"
                    />
                  </p>
                </p>
              )}
              {order_selected === PARKFACTOR && (
                <p>
                  <p>
                    <AppBar
                      position="static"
                      color="default"
                      className={classes.des}
                    >
                      <Toolbar variant="dense">
                        <Typography variant="h6" className={classes.des2}>
                          パークファクター(2019)　※参考値
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
                      league=""
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
                        <Typography variant="h6" className={classes.des2}>
                          パークファクター(2016以降)　※参考値
                        </Typography>
                      </Toolbar>
                    </AppBar>
                    <CommonTable
                      classes={styles}
                      default_order="desc"
                      default_orderBy="得点PF"
                      head={parks_header}
                      data={parks_total_body}
                      row_length={parks_body.length}
                      league=""
                    />
                  </p>
                </p>
              )}
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
                    <Typography variant="h6" className={classes.des2}>
                      野手総合指標
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="wRC+"
                  head={hitters_sabr_header}
                  data={hitters_sabr_body}
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
              {middle_ad2(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des2}>
                      チャンス
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="圏打率"
                  head={hitters_header_clutch}
                  data={hitters_body_clutch}
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
                    <Typography variant="h6" className={classes.des2}>
                      その他
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="BABIP"
                  head={hitters_header_oth}
                  data={hitters_body_oth}
                  row_length="10"
                  league={league}
                />
              </p>
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
                    <Typography variant="h6" className={classes.des2}>
                      先発投手総合指標
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="asc"
                  default_orderBy="防御率"
                  head={pitchers_sabr_header}
                  data={pitchers_sabr_body}
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
                    <Typography variant="h6" className={classes.des2}>
                      先発投手（投手タイトル関連）
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="投球回"
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
                    <Typography variant="h6" className={classes.des2}>
                      先発投手（三振・四球・本塁打）
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="K-BB%"
                  head={pitchers_header_kbb}
                  data={pitchers_body_kbb}
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
                    <Typography variant="h6" className={classes.des2}>
                      先発投手（被出塁）
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
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des2}>
                      先発投手（ＱＳ・完投）
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
                    <Typography color="inherit" className={classes.des2}>
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
                    <Typography variant="h6" className={classes.des2}>
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
              {middle_ad1(classes)}
              <p>
                <AppBar
                  position="static"
                  color="default"
                  className={classes.des}
                >
                  <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.des2}>
                      その他
                    </Typography>
                  </Toolbar>
                </AppBar>
                <CommonTable
                  classes={styles}
                  default_order="desc"
                  default_orderBy="小松式ドネーション"
                  head={pitchers_header_oth}
                  data={pitchers_body_oth}
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
