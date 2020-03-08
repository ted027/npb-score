import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { HideOnScroll } from "../Pages";
import { CommonTable } from "../Tables";
import { VisibleLeagueAppBar } from "../../containers/changeTab";
import { VisibleSearch } from "../../containers/VisibleSearch";
import { top_ad, middle_ad1, middle_ad2, middle_ad3, middle_ad4 } from "../Ad";
import { MainProps } from ".";
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
} from "../../datastore/Pitchers";

export const Pitcher: React.FC<MainProps> = props => {
  const { classes, pageState, yearState } = props;
  const { league_selected, league } = pageState;
  const { year_selected } = yearState;
  return (
    <div className={classes.individualRoot}>
      <HideOnScroll {...props} direction="down">
        <VisibleLeagueAppBar selected={league_selected} />
      </HideOnScroll>
      <div className={classes.fab}>
        <HideOnScroll {...props} direction="up">
          <VisibleSearch />
        </HideOnScroll>
      </div>
      {top_ad(classes)}
      <div>
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
        <AppBar position="static" color="default" className={classes.des}>
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
  );
};
