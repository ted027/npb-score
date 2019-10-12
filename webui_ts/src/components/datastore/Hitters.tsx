import hittersj from "../../records/hitters.json";
import { createHeader, createBody, createBodyClutch } from "./DataCommon";

const hitters = hittersj.Hitter;

//sabr
const hheader_sabr = ["wRC+", "OPS+", "TAv", "XRWIN", "規定", "League"];
const hheader_sabr_regulated = [true, true, true, true, false, false];
const hheader_sabr_order = new Array(hheader_sabr.length).fill("desc");
export const hitters_sabr_header = createHeader(
  hheader_sabr,
  hheader_sabr_regulated,
  hheader_sabr_order
);
export const hitters_sabr_body = createBody(hitters, hheader_sabr);

// award
const hheader = ["打率", "安打", "本塁打", "打点", "盗塁", "規定", "League"];
const hheader_regulated = [true, false, false, false, false, false, false];
const hheader_order = new Array(hheader.length).fill("desc");
export const hitters_header = createHeader(
  hheader,
  hheader_regulated,
  hheader_order
);
export const hitters_body = createBody(hitters, hheader);

// ops

const hheader_ops = ["出塁率", "長打率", "OPS", "OPS+", "規定", "League"];
const hheader_ops_regulated = [true, true, true, true, false, false];
const hheader_ops_order = new Array(hheader_ops.length).fill("desc");
export const hitters_header_ops = createHeader(
  hheader_ops,
  hheader_ops_regulated,
  hheader_ops_order
);
export const hitters_body_ops = createBody(hitters, hheader_ops);

// woba

const hheader_woba = ["wOBA", "wRAA", "wRC", "wRC+", "規定", "League"];
const hheader_woba_regulated = [true, false, false, true, false, false];
const hheader_woba_order = new Array(hheader_woba.length).fill("desc");
export const hitters_header_woba = createHeader(
  hheader_woba,
  hheader_woba_regulated,
  hheader_woba_order
);
export const hitters_body_woba = createBody(hitters, hheader_woba);

// xr

const hheader_xr = ["XR", "XR27", "XR+", "XRWIN", "規定", "League"];
const hheader_xr_regulated = [false, true, false, false, false, false];
const hheader_xr_order = new Array(hheader_xr.length).fill("desc");
export const hitters_header_xr = createHeader(
  hheader_xr,
  hheader_xr_regulated,
  hheader_xr_order
);
export const hitters_body_xr = createBody(hitters, hheader_xr);

// contact

const hheader_contact = ["K%", "三振", "打率", "安打", "規定", "League"];
const hheader_contact_regulated = [true, true, true, false, false, false];
const hheader_contact_order = ["asc", "asc", "desc", "desc", "desc", "desc"];
export const hitters_header_contact = createHeader(
  hheader_contact,
  hheader_contact_regulated,
  hheader_contact_order
);
export const hitters_body_contact = createBody(hitters, hheader_contact);

// power

const hheader_power = [
  "IsoP",
  "長打率",
  "本塁打率",
  "本塁打",
  "規定",
  "League"
];
const hheader_power_regulated = [true, true, true, false, false, false];
const hheader_power_order = new Array(hheader_power.length).fill("desc");
export const hitters_header_power = createHeader(
  hheader_power,
  hheader_power_regulated,
  hheader_power_order
);
export const hitters_body_power = createBody(hitters, hheader_power);

// eye

const hheader_eye = ["BB%", "四球", "IsoD", "BB/K", "規定", "League"];
const hheader_eye_regulated = [true, false, true, true, false, false];
const hheader_eye_order = new Array(hheader_eye.length).fill("desc");
export const hitters_header_eye = createHeader(
  hheader_eye,
  hheader_eye_regulated,
  hheader_eye_order
);
export const hitters_body_eye = createBody(hitters, hheader_eye);

// steal

const hheader_steal = ["wSB", "盗塁", "盗成功率", "三塁打", "規定", "League"];
const hheader_steal_regulated = [false, false, true, false, false, false];
const hheader_steal_order = new Array(hheader_steal.length).fill("desc");
export const hitters_header_steal = createHeader(
  hheader_steal,
  hheader_steal_regulated,
  hheader_steal_order
);
export const hitters_body_steal = createBody(hitters, hheader_steal);

// clutch

const hheader_clutch = ["圏打率", "圏打数", "圏安打", "打点", "規定", "League"];
const hheader_clutch_regulated = [true, false, false, false, false, false];
const hheader_clutch_order = new Array(hheader_clutch.length).fill("desc");
export const hitters_header_clutch = createHeader(
  hheader_clutch,
  hheader_clutch_regulated,
  hheader_clutch_order
);
export const hitters_body_clutch = createBodyClutch(hitters, hheader_clutch);

// oth

const hheader_oth = ["BABIP", "アダムダン率", "ONE OUTS(万)", "規定", "League"];
const hheader_oth_regulated = [true, true, false, false, false];
const hheader_oth_order = new Array(hheader_oth.length).fill("desc");
export const hitters_header_oth = createHeader(
  hheader_oth,
  hheader_oth_regulated,
  hheader_oth_order
);
export const hitters_body_oth = createBody(hitters, hheader_oth);
