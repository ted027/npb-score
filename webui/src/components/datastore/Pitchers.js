import pitchersj from "../../records/pitchers.json";
import { createHeader, createBody, createHeaderRelief } from "./DataCommon";

const pitchers = pitchersj.Pitcher;

// sabr
const pheader_sabr = ["防御率", "FIP", "FIP_pf", "K/BB", "規定", "League"];
const pheader_sabr_regulated = [true, true, true, true, false, false];
const pheader_sabr_order = ["asc", "asc", "asc", "desc", "desc", "desc"];
export const pitchers_sabr_header = createHeader(
  pheader_sabr,
  pheader_sabr_regulated,
  pheader_sabr_order
);
export const pitchers_sabr_body = createBody(pitchers, pheader_sabr);

// main records
const pheader = ["投球回", "勝利", "敗戦", "勝率", "奪三振", "規定", "League"];
const pheader_regulated = [false, false, false, true, false, false, false];
const pheader_order = ["desc", "desc", "desc", "desc", "desc", "desc", "desc"];
export const pitchers_header = createHeader(
  pheader,
  pheader_regulated,
  pheader_order
);
export const pitchers_body = createBody(pitchers, pheader);

// whip
const pheader_whip = ["WHIP", "被打率", "LOB%", "BABIP", "規定", "League"];
const pheader_regulated_whip = [true, true, true, true, false, false];
const pheader_order_whip = ["asc", "asc", "desc", "asc", "desc", "desc"];
export const pitchers_header_whip = createHeader(
  pheader_whip,
  pheader_regulated_whip,
  pheader_order_whip
);
export const pitchers_body_whip = createBody(pitchers, pheader_whip);

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
export const pitchers_header_qs = createHeader(
  pheader_qs,
  pheader_regulated_qs,
  pheader_order_qs
);
export const pitchers_body_qs = createBody(pitchers, pheader_qs);

// kbb
const pheader_kbb = ["K-BB%", "K%", "BB%", "HR%", "規定", "League"];
const pheader_regulated_kbb = [true, true, true, true, false, false];
const pheader_order_kbb = ["desc", "desc", "asc", "asc", "desc", "desc"];
export const pitchers_header_kbb = createHeader(
  pheader_kbb,
  pheader_regulated_kbb,
  pheader_order_kbb
);
export const pitchers_body_kbb = createBody(pitchers, pheader_kbb);

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
export const pitchers_header_closer = createHeaderRelief(
  pheader_closer,
  pheader_regulated_closer,
  pheader_order_closer,
  pheader_rnumeric_closer
);
export const pitchers_body_closer = createBody(pitchers, pheader_closer);

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
export const pitchers_header_relief = createHeaderRelief(
  pheader_relief,
  pheader_regulated_relief,
  pheader_order_relief,
  pheader_rnumeric_relief
);
export const pitchers_body_relief = createBody(pitchers, pheader_relief);

// oth
const pheader_oth = ["小松式ドネーション", "ONE OUTS年俸(万)", "規定", "League"];
const pheader_regulated_oth = [false, false, false, false];
const pheader_order_oth = ["desc", "desc", "desc", "desc"];
export const pitchers_header_oth = createHeader(
  pheader_oth,
  pheader_regulated_oth,
  pheader_order_oth
);
export const pitchers_body_oth = createBody(pitchers, pheader_oth);
