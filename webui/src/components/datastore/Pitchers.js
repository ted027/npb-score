import pitchersj from "../../records/pitchers.json";
import { createHeader, createBody } from "./DataCommon";

const pitchers = pitchersj.Pitcher;

const pheader = [
  "防御率",
  "投球回",
  "勝利",
  "敗戦",
  "勝率",
  "奪三振",
  "規定",
  "League"
];
const pheader_regulated = [
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];
const pheader_order = [
  "asc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc"
];
export const pitchers_header = createHeader(
  pheader,
  pheader_regulated,
  pheader_order
);
export const pitchers_body = createBody(pitchers, pheader);

// whip
const pheader_whip = [
  "WHIP",
  "被打率",
  "FIP",
  "BABIP",
  "HR/9",
  "規定",
  "League"
];
const pheader_regulated_whip = [true, true, true, true, true, false, false];
const pheader_order_whip = ["asc", "asc", "asc", "asc", "asc", "desc", "desc"];
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
const pheader_kbb = ["K/BB", "K%", "奪三振率", "BB%", "BB/9", "規定", "League"];
const pheader_regulated_kbb = [true, true, true, true, true, false, false];
const pheader_order_kbb = [
  "desc",
  "desc",
  "desc",
  "asc",
  "asc",
  "desc",
  "desc"
];
export const pitchers_header_kbb = createHeader(
  pheader_kbb,
  pheader_regulated_kbb,
  pheader_order_kbb
);
export const pitchers_body_kbb = createBody(pitchers, pheader_kbb);

// relief
const pheader_relief = [
  "登板",
  "HP",
  "セーブ",
  "WHIP",
  "被打率",
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
const pheader_order_relief = [
  "desc",
  "desc",
  "desc",
  "asc",
  "asc",
  "desc",
  "desc"
];
export const pitchers_header_relief = createHeader(
  pheader_relief,
  pheader_regulated_relief,
  pheader_order_relief
);
export const pitchers_body_relief = createBody(pitchers, pheader_relief);

// relief_kbb
const pheader_relief_kbb = ["K/BB", "K%", "奪三振率", "BB%", "規定", "League"];
const pheader_regulated_relief_kbb = [false, false, false, false, false, false];
const pheader_order_relief_kbb = [
  "desc",
  "desc",
  "desc",
  "asc",
  "desc",
  "desc"
];
export const pitchers_header_relief_kbb = createHeader(
  pheader_relief_kbb,
  pheader_regulated_relief_kbb,
  pheader_order_relief_kbb
);
export const pitchers_body_relief_kbb = createBody(
  pitchers,
  pheader_relief_kbb
);
