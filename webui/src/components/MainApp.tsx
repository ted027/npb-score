import React from "react";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../theme";
import {
  teams_header_stats,
  teams_header_offense,
  teams_header_defense,
  teams_body_of_year
} from "../datastore/Teams";
import { parks_header, parks_body, parks_total_body } from "../datastore/Parks";
import {
  hitters_sabr_header,
  hitters_header_title,
  hitters_header_ops,
  hitters_header_woba,
  hitters_header_xr,
  hitters_header_contact,
  hitters_header_power,
  hitters_header_eye,
  hitters_header_steal,
  hitters_header_clutch,
  hitters_header_oth,
  hitters_body_of_year
} from "../datastore/Hitters";
import {
  pitchers_sabr_header,
  pitchers_header_title,
  pitchers_header_whip,
  pitchers_header_qs,
  pitchers_header_kbb,
  pitchers_header_relief,
  pitchers_header_closer,
  pitchers_header_oth,
  pitchers_body_of_year
} from "../datastore/Pitchers";
import styles from "../styles";
import { CommonTable } from "./Tables";
import { HideOnScroll } from "./Pages";
import {
  VisibleMainAppBar,
  VisibleLeagueAppBar,
  VisibleOrderAppBar
} from "../containers/changeTab";
import { VisibleSelectYearBar } from "../containers/selectYear";
import { VisibleSearch } from "../containers/VisibleSearch";
import {
  top_ad,
  bottom_ad,
  middle_ad1,
  middle_ad2,
  middle_ad3,
  middle_ad4
} from "./Ad";
import { selectYears } from "../constants";

const ORDER_VALUE = 0;
const HITTER_VALUE = 1;
const PITCHER_VALUE = 2;

const ORDER = 0;
const PARKFACTOR = 1;

interface pageState {
  selected: number;
  order_selected: number;
  league_selected: number;
  league: "CentralPacific" | "Central" | "Pacific" | "";
  searchTeam: string;
  searchName: string;
}

interface yearState {
  year_selected: selectYears;
}

interface Props extends WithStyles<typeof styles> {
  pageState: pageState;
  yearState: yearState
}

class MainApp extends React.Component<Props> {
  render() {
    const { classes, pageState, yearState } = this.props;
    const {
      selected,
      order_selected,
      league_selected,
      league,
    } = pageState;
    const { year_selected } = yearState;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          {/* <div>
            <HideOnScroll {...this.props} direction="down">
              <VisibleSelectYearBar />
            </HideOnScroll>
          </div> */}
          <div className={classes.tab}>
            <HideOnScroll {...this.props} direction="down">
              <VisibleMainAppBar selected={selected} />
            </HideOnScroll>
          </div>
          {selected === ORDER_VALUE && (
            <div className={classes.individualRoot}>
              <HideOnScroll {...this.props} direction="down">
                <VisibleOrderAppBar selected={order_selected} />
              </HideOnScroll>
              {top_ad(classes)}
              {order_selected === ORDER && (
                <div>
                  <div>
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
                      default_order="desc"
                      default_orderBy="勝率"
                      head={teams_header_stats}
                      data={teams_body_of_year(year_selected).stats}
                      const_row_length={
                        teams_body_of_year(year_selected).stats.length
                      }
                      league="Central"
                      main_state={pageState}
                    />
                  </div>
                  <div>
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
                      default_order="desc"
                      default_orderBy="勝率"
                      head={teams_header_stats}
                      data={teams_body_of_year(year_selected).stats}
                      const_row_length={
                        teams_body_of_year(year_selected).stats.length
                      }
                      league="Pacific"
                      main_state={pageState}
                    />
                  </div>
                  {middle_ad1(classes)}
                  <div>
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
                      default_order="desc"
                      default_orderBy="得点"
                      head={teams_header_offense}
                      data={teams_body_of_year(year_selected).offense}
                      const_row_length={
                        teams_body_of_year(year_selected).offense.length
                      }
                      league="Central"
                      main_state={pageState}
                    />
                  </div>
                  <div>
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
                      default_order="desc"
                      default_orderBy="得点"
                      head={teams_header_offense}
                      data={teams_body_of_year(year_selected).offense}
                      const_row_length={
                        teams_body_of_year(year_selected).offense.length
                      }
                      league="Pacific"
                      main_state={pageState}
                    />
                  </div>
                  {middle_ad4(classes)}
                  <div>
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
                      default_order="asc"
                      default_orderBy="失点"
                      head={teams_header_defense}
                      data={teams_body_of_year(year_selected).defense}
                      const_row_length={
                        teams_body_of_year(year_selected).defense.length
                      }
                      league="Central"
                      main_state={pageState}
                    />
                  </div>
                  <div>
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
                      default_order="asc"
                      default_orderBy="失点"
                      head={teams_header_defense}
                      data={teams_body_of_year(year_selected).defense}
                      const_row_length={
                        teams_body_of_year(year_selected).defense.length
                      }
                      league="Pacific"
                      main_state={pageState}
                    />
                  </div>
                </div>
              )}
              {order_selected === PARKFACTOR && (
                <div>
                  <div>
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
                      default_order="desc"
                      default_orderBy="得点PF"
                      head={parks_header}
                      data={parks_body}
                      const_row_length={parks_body.length}
                      league=""
                      main_state={pageState}
                    />
                  </div>
                  {middle_ad1(classes)}
                  <div>
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
                      default_order="desc"
                      default_orderBy="得点PF"
                      head={parks_header}
                      data={parks_total_body}
                      const_row_length={parks_body.length}
                      league=""
                      main_state={pageState}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {selected === HITTER_VALUE && (
            <div className={classes.individualRoot}>
              <HideOnScroll {...this.props} direction="down">
                <VisibleLeagueAppBar selected={league_selected} />
              </HideOnScroll>
              <div className={classes.fab}>
                <HideOnScroll {...this.props} direction="up">
                  <VisibleSearch />
                </HideOnScroll>
              </div>
              {top_ad(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="wRC+"
                  head={hitters_sabr_header}
                  data={hitters_body_of_year(year_selected).sabr}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="desc"
                  default_orderBy="打率"
                  head={hitters_header_title}
                  data={hitters_body_of_year(year_selected).title}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad2(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="出塁率"
                  head={hitters_header_ops}
                  data={hitters_body_of_year(year_selected).ops}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="desc"
                  default_orderBy="wOBA"
                  head={hitters_header_woba}
                  data={hitters_body_of_year(year_selected).woba}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad1(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="XR"
                  head={hitters_header_xr}
                  data={hitters_body_of_year(year_selected).xr}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="asc"
                  default_orderBy="K%"
                  head={hitters_header_contact}
                  data={hitters_body_of_year(year_selected).contact}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad4(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="IsoP"
                  head={hitters_header_power}
                  data={hitters_body_of_year(year_selected).power}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="desc"
                  default_orderBy="BB%"
                  head={hitters_header_eye}
                  data={hitters_body_of_year(year_selected).eye}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad2(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="wSB"
                  head={hitters_header_steal}
                  data={hitters_body_of_year(year_selected).steal}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="desc"
                  default_orderBy="圏打率"
                  head={hitters_header_clutch}
                  data={hitters_body_of_year(year_selected).clutch}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad3(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="BABIP"
                  head={hitters_header_oth}
                  data={hitters_body_of_year(year_selected).oth}
                  league={league}
                  main_state={pageState}
                />
              </div>
            </div>
          )}
          {selected === PITCHER_VALUE && (
            <div className={classes.individualRoot}>
              <HideOnScroll {...this.props} direction="down">
                <VisibleLeagueAppBar selected={league_selected} />
              </HideOnScroll>
              <div className={classes.fab}>
                <HideOnScroll {...this.props} direction="up">
                  <VisibleSearch />
                </HideOnScroll>
              </div>
              {top_ad(classes)}
              <div>
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
                  default_order="asc"
                  default_orderBy="防御率"
                  head={pitchers_sabr_header}
                  data={pitchers_body_of_year(year_selected).sabr}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="desc"
                  default_orderBy="投球回"
                  head={pitchers_header_title}
                  data={pitchers_body_of_year(year_selected).title}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad1(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="K-BB%"
                  head={pitchers_header_kbb}
                  data={pitchers_body_of_year(year_selected).kbb}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="asc"
                  default_orderBy="WHIP"
                  head={pitchers_header_whip}
                  data={pitchers_body_of_year(year_selected).whip}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad2(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="QS率"
                  head={pitchers_header_qs}
                  data={pitchers_body_of_year(year_selected).qs}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad4(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="セーブ"
                  head={pitchers_header_closer}
                  data={pitchers_body_of_year(year_selected).closer}
                  league={league}
                  main_state={pageState}
                />
              </div>
              <div>
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
                  default_order="desc"
                  default_orderBy="HP"
                  head={pitchers_header_relief}
                  data={pitchers_body_of_year(year_selected).relief}
                  league={league}
                  main_state={pageState}
                />
              </div>
              {middle_ad3(classes)}
              <div>
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
                  default_order="desc"
                  default_orderBy="小松式ドネーション"
                  head={pitchers_header_oth}
                  data={pitchers_body_of_year(year_selected).oth}
                  league={league}
                  main_state={pageState}
                />
              </div>
            </div>
          )}
          {middle_ad2(classes)}
          {bottom_ad(classes)}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(MainApp);
