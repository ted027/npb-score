import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "../../styles";
import { HideOnScroll } from "../Pages";
import { CommonTable } from "../Tables";
import { VisibleLeagueAppBar } from "../../containers/changeTab";
import { VisibleSearch } from "../../containers/VisibleSearch";
import { top_ad, middle_ad1, middle_ad2, middle_ad3, middle_ad4 } from "../Ad";
import { MainProps } from ".";
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
} from "../../datastore/Hitters";

const Hitter: React.FC<MainProps> = props => {
  const { classes, pageState, yearState } = props;
  const { league_selected, league } = pageState;
  const { year_selected } = yearState;
  return (
    <div className={classes.individualRoot}>
      <HideOnScroll {...props} direction="down">
        <VisibleLeagueAppBar selected={league_selected} />
      </HideOnScroll>
      <div className={classes.bottom1Fab}>
        <HideOnScroll {...props} direction="up">
          <VisibleSearch />
        </HideOnScroll>
      </div>
      {top_ad(classes)}
      <div>
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
  );
};

export default withStyles(styles)(Hitter);
