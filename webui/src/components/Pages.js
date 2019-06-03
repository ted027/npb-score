import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { parks_header, parks_body } from "./datastore/Teams";
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
  pitchers_header_relief_kbb,
  pitchers_body_relief_kbb
} from "./datastore/Pitchers";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { styles, LinkTab } from "./Common";
import { TeamTable, CommonTable } from "./Tables";
import { top_ad, bottom_ad, middle_ad1, middle_ad2 } from "./Ad";

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
      <div className={classes.root}>
        <div className={classes.tab}>
          <AppBar>
            <Tabs
              variant="fullWidth"
              selected={selected}
              value={selected}
              scrollable
              scrollButtons="auto"
              onChange={this.handleTabChange}
            >
              <Tab label="順位表" />
              <Tab label="野手成績" />
              <Tab label="投手成績" />
              <LinkTab label="BLOG" href="/" />
            </Tabs>
          </AppBar>
        </div>
        {selected === ORDER_VALUE && (
          <div className={classes.root}>
            {top_ad(classes)}
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
                    セリーグ順位表
                  </Typography>
                </Toolbar>
              </AppBar>
              <TeamTable classes={styles} league="Central" />
            </p>
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
                    パリーグ順位表
                  </Typography>
                </Toolbar>
              </AppBar>
              <TeamTable classes={styles} league="Pacific" />
            </p>
            {middle_ad2(classes)}
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
                // league="True"
              />
            </p>
            {bottom_ad(classes)}
          </div>
        )}
        {selected === HITTER_VALUE && (
          <div className={classes.individualRoot}>
            <AppBar className={classes.subtab}>
              <Tabs
                variant="fullWidth"
                selected={league_selected}
                value={league_selected}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
                onChange={this.handleLeagueChange}
              >
                <Tab label="CENTRAL" />
                <Tab label="PACIFIC" />
              </Tabs>
            </AppBar>
            {top_ad(classes)}
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
            {middle_ad2(classes)}
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
            </p>
            {bottom_ad(classes)}
          </div>
        )}
        {selected === PITCHER_VALUE && (
          <div className={classes.individualRoot}>
            <AppBar className={classes.subtab}>
              <Tabs
                variant="fullWidth"
                selected={league_selected}
                value={league_selected}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
                onChange={this.handleLeagueChange}
              >
                <Tab label="CENTRAL" />
                <Tab label="PACIFIC" />
              </Tabs>
            </AppBar>
            {top_ad(classes)}
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
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
            {middle_ad1(classes)}
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
                    リリーフ投手込み１
                  </Typography>
                </Toolbar>
              </AppBar>
              <CommonTable
                classes={styles}
                default_order="desc"
                default_orderBy="登板"
                head={pitchers_header_relief}
                data={pitchers_body_relief}
                row_length="10"
                league={league}
              />
            </p>
            <p>
              <AppBar position="static" color="default" className={classes.des}>
                <Toolbar variant="dense">
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.des}
                  >
                    リリーフ投手込み２（三振・四球）
                  </Typography>
                </Toolbar>
              </AppBar>
              <CommonTable
                classes={styles}
                default_order="desc"
                default_orderBy="K/BB"
                head={pitchers_header_relief_kbb}
                data={pitchers_body_relief_kbb}
                row_length="10"
                league={league}
              />
            </p>
            {bottom_ad(classes)}
          </div>
        )}
      </div>
    );
  }
}

DefaultPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DefaultPage);
