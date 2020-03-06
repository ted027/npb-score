import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { HideOnScroll } from "../Pages";
import { CommonTable } from "../Tables";
import { VisibleOrderAppBar } from "../../containers/changeTab";
import { top_ad, middle_ad1, middle_ad4 } from "../Ad";
import {
  teams_header_stats,
  teams_header_offense,
  teams_header_defense,
  teams_body_of_year
} from "../../datastore/Teams";
import {
  parks_header,
  parks_body,
  parks_total_body
} from "../../datastore/Parks";

const ORDER = 0;
const PARKFACTOR = 1;

export const Order = (props: any) => {
  <div className={props.classes.individualRoot}>
    <HideOnScroll {...props} direction="down">
      <VisibleOrderAppBar selected={props.pageState.order_selected} />
    </HideOnScroll>
    {top_ad(props.classes)}
    {props.pageState.order_selected === ORDER && (
      <div>
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
                セリーグ順位表
              </Typography>
            </Toolbar>
          </AppBar>
          <CommonTable
            default_order="desc"
            default_orderBy="勝率"
            head={teams_header_stats}
            data={teams_body_of_year(props.yearState.year_selected).stats}
            const_row_length={
              teams_body_of_year(props.yearState.year_selected).stats.length
            }
            league="Central"
            main_state={props.pageState}
          />
        </div>
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
                パリーグ順位表
              </Typography>
            </Toolbar>
          </AppBar>
          <CommonTable
            default_order="desc"
            default_orderBy="勝率"
            head={teams_header_stats}
            data={teams_body_of_year(props.yearState.year_selected).stats}
            const_row_length={
              teams_body_of_year(props.yearState.year_selected).stats.length
            }
            league="Pacific"
            main_state={props.pageState}
          />
        </div>
        {middle_ad1(props.classes)}
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
                セリーグ野手成績
              </Typography>
            </Toolbar>
          </AppBar>
          <CommonTable
            default_order="desc"
            default_orderBy="得点"
            head={teams_header_offense}
            data={teams_body_of_year(props.yearState.year_selected).offense}
            const_row_length={
              teams_body_of_year(props.yearState.year_selected).offense.length
            }
            league="Central"
            main_state={props.pageState}
          />
        </div>
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
                パリーグ野手成績
              </Typography>
            </Toolbar>
          </AppBar>
          <CommonTable
            default_order="desc"
            default_orderBy="得点"
            head={teams_header_offense}
            data={teams_body_of_year(props.yearState.year_selected).offense}
            const_row_length={
              teams_body_of_year(props.yearState.year_selected).offense.length
            }
            league="Pacific"
            main_state={props.pageState}
          />
        </div>
        {middle_ad4(props.classes)}
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
                セリーグ投手成績
              </Typography>
            </Toolbar>
          </AppBar>
          <CommonTable
            default_order="asc"
            default_orderBy="失点"
            head={teams_header_defense}
            data={teams_body_of_year(props.yearState.year_selected).defense}
            const_row_length={
              teams_body_of_year(props.yearState.year_selected).defense.length
            }
            league="Central"
            main_state={props.pageState}
          />
        </div>
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
                パリーグ投手成績
              </Typography>
            </Toolbar>
          </AppBar>
          <CommonTable
            default_order="asc"
            default_orderBy="失点"
            head={teams_header_defense}
            data={teams_body_of_year(props.yearState.year_selected).defense}
            const_row_length={
              teams_body_of_year(props.yearState.year_selected).defense.length
            }
            league="Pacific"
            main_state={props.pageState}
          />
        </div>
      </div>
    )}
    {props.pageState.order_selected === PARKFACTOR && (
      <div>
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
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
            main_state={props.pageState}
          />
        </div>
        {middle_ad1(props.classes)}
        <div>
          <AppBar
            position="static"
            color="default"
            className={props.classes.des}
          >
            <Toolbar variant="dense">
              <Typography variant="h6" className={props.classes.des2}>
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
            main_state={props.pageState}
          />
        </div>
      </div>
    )}
  </div>;
};
