import pitchersj2019 from "../../records/2019/pitchers.json";
// import pitchersj2020 from "../../records/2020/pitchers.json";
import { createHeader, createBody, createHeaderRelief } from "./DataCommon";
import { selectYears, teamDict } from "../../constants"

const pitchers: teamDict[] = pitchersj2019.Pitcher;

// sabr
const pheader_sabr = ["防御率", "FIP", "FIP_pf", "K/BB", "規定", "League"];
const pheader_sabr_regulated = [true, true, true, true, false, false];
const pheader_sabr_order = ["asc", "asc", "asc", "desc", "desc", "desc"];
export const pitchers_sabr_header: {[key: string]: string | boolean; id: string}[] = createHeader(
  pheader_sabr,
  pheader_sabr_regulated,
  pheader_sabr_order
);

// main records
const pheader_title = ["投球回", "勝利", "敗戦", "勝率", "奪三振", "規定", "League"];
const pheader_regulated_title = [false, false, false, true, false, false, false];
const pheader_order_title = ["desc", "desc", "desc", "desc", "desc", "desc", "desc"];
export const pitchers_header_title: {[key: string]: string | boolean; id: string}[] = createHeader(
  pheader_title,
  pheader_regulated_title,
  pheader_order_title
);

// whip
const pheader_whip = ["WHIP", "被打率", "LOB%", "BABIP", "規定", "League"];
const pheader_regulated_whip = [true, true, true, true, false, false];
const pheader_order_whip = ["asc", "asc", "desc", "asc", "desc", "desc"];
export const pitchers_header_whip: {[key: string]: string | boolean; id: string}[] = createHeader(
  pheader_whip,
  pheader_regulated_whip,
  pheader_order_whip
);

// qs
const pheader_qs = ["QS率", "QS", "先発", "完投", "完封", "規定", "League"];
const pheader_regulated_qs = [true, false, false, false, false, false, false];
const pheader_order_qs = [
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc"
];
export const pitchers_header_qs: {[key: string]: string | boolean; id: string}[] = createHeader(
  pheader_qs,
  pheader_regulated_qs,
  pheader_order_qs
);

// kbb
const pheader_kbb = ["K-BB%", "K%", "BB%", "HR%", "規定", "League"];
const pheader_regulated_kbb = [true, true, true, true, false, false];
const pheader_order_kbb = ["desc", "desc", "asc", "asc", "desc", "desc"];
export const pitchers_header_kbb: {[key: string]: string | boolean; id: string}[] = createHeader(
  pheader_kbb,
  pheader_regulated_kbb,
  pheader_order_kbb
);

// closer
const pheader_closer = [
  "登板",
  "セーブ",
  "防御率",
  "WHIP",
  "K/BB",
  "規定",
  "League"
];
const pheader_regulated_closer = [
  false,
  false,
  false,
  false,
  false,
  false,
  false
];
const pheader_rnumeric_closer = [true, true, false, false, false, false, false];
const pheader_order_closer = [
  "desc",
  "desc",
  "asc",
  "asc",
  "desc",
  "desc",
  "desc"
];
export const pitchers_header_closer: {[key: string]: string | boolean; id: string}[] = createHeaderRelief(
  pheader_closer,
  pheader_regulated_closer,
  pheader_order_closer,
  pheader_rnumeric_closer
);

// relief
const pheader_relief = [
  "登板",
  "HP",
  "防御率",
  "WHIP",
  "K/BB",
  "規定",
  "League"
];
const pheader_regulated_relief = [
  false,
  false,
  false,
  false,
  false,
  false,
  false
];
const pheader_rnumeric_relief = [true, true, false, false, false, false, false];
const pheader_order_relief = [
  "desc",
  "desc",
  "asc",
  "asc",
  "desc",
  "desc",
  "desc"
];
export const pitchers_header_relief: {[key: string]: string | boolean; id: string}[] = createHeaderRelief(
  pheader_relief,
  pheader_regulated_relief,
  pheader_order_relief,
  pheader_rnumeric_relief
);

// oth
const pheader_oth = ["小松式ドネーション", "ONE OUTS(万)", "規定", "League"];
const pheader_regulated_oth = [false, false, false, false];
const pheader_order_oth = ["desc", "desc", "desc", "desc"];
export const pitchers_header_oth: {[key: string]: string | boolean; id: string}[] = createHeader(
  pheader_oth,
  pheader_regulated_oth,
  pheader_order_oth
);

type pitchers_body = {
  sabr: {[key: string]: string | boolean}[],
  title: {[key: string]: string | boolean}[],
  ops: {[key: string]: string | boolean}[],
  woba: {[key: string]: string | boolean}[],
  xr: {[key: string]: string | boolean}[],
  contact: {[key: string]: string | boolean}[],
  power: {[key: string]: string | boolean}[],
  eye: {[key: string]: string | boolean}[],
  steal: {[key: string]: string | boolean}[],
  clutch: {[key: string]: string | boolean}[],
  oth: {[key: string]: string | boolean}[]
};

export const pitchers_body_of_year = (year: selectYears): pitchers_body => {
  var pitchers = yearJson[year]
  return {
    sabr: createBody(pitchers, pheader_sabr),
    title: createBody(pitchers, pheader_title),
    whip: createBody(pitchers, pheader_whip),
    qs: createBody(pitchers, pheader_qs),
    kbb:  createBody(pitchers, pheader_kbb),
    closer: createBody(pitchers, pheader_closer),
    relief: createBody(pitchers, pheader_relief),
    oth: createBody(pitchers, pheader_oth)
  };
}