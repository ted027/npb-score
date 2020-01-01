import teamsj from "../../records/teams.json";
import parksj from "../../records/parks.json";
import { createData, teamConverter } from "./DataCommon";

const teams: {チーム: string; [key: string]: any}[] = teamsj.Team;
const parks: {球場: string; [key: string]: any}[] = parksj.Park;

// Teams
//
//
const theader = [
  "チーム",
  "試合",
  "勝利",
  "敗戦",
  "引分",
  "勝率",
  "勝差",
  "League"
];

const teams_numeric = new Array(theader.length).fill(false);

export function createTeamBody(array: {チーム: string; [key: string]: any}[], head: string[]) {
  const body: {[key: string]: string | boolean}[] = [];
  for (var j = 0; j < array.length; j++) {
    var body_team: {[key: string]: any} = {};
    for (var k = 0; k < head.length; k++) {
      if (head[k] === "チーム") {
        body_team[head[k]] = teamConverter[array[j][head[k]]];
      } else {
        body_team[head[k]] = array[j][head[k]];
      }
    }
    body.push(createData(body_team));
  }
  return body;
}

export const teams_header: {[key: string]: string | boolean; id: string}[] = [];
for (var t = 0; t < theader.length; t++) {
  teams_header.push({
    id: theader[t],
    numeric: teams_numeric[t],
    label: theader[t]
  });
}

export const teams_body: {[key: string]: string | boolean}[] = createTeamBody(teams, theader);

const t_atk_header = [
  "チーム",
  "得点",
  "打率",
  "本塁打",
  "四球",
  "盗塁",
  "League"
];

const teams_atk_numeric = [false, true, true, true, true, true, false];

const teams_atk_order = [
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc"
];

export const teams_atk_header: {[key: string]: string | boolean; id: string}[] = [];
for (var ta = 0; ta < t_atk_header.length; ta++) {
  teams_atk_header.push({
    id: t_atk_header[ta],
    numeric: teams_atk_numeric[ta],
    defaultOrder: teams_atk_order[ta],
    label: t_atk_header[ta]
  });
}

export const teams_atk_body: {[key: string]: string | boolean}[] = createTeamBody(teams, t_atk_header);

const t_def_header = [
  "チーム",
  "失点",
  "防御率",
  "奪三振",
  "与四球",
  "被HR",
  "League"
];

const teams_def_numeric = [false, true, true, true, true, true, false];

const teams_def_order = ["desc", "asc", "asc", "desc", "asc", "asc", "desc"];

export const teams_def_header: {[key: string]: string | boolean; id: string}[] = [];
for (var td = 0; td < t_def_header.length; td++) {
  teams_def_header.push({
    id: t_def_header[td],
    numeric: teams_def_numeric[td],
    defaultOrder: teams_def_order[td],
    label: t_def_header[td]
  });
}

export const teams_def_body: {[key: string]: string | boolean}[] = createTeamBody(teams, t_def_header);

// parks
//
//
var raw_prheader = Object.keys(parks[0]);
var prheader = raw_prheader.filter(function(raw_prh) {
  return raw_prh !== "2019";
});
prheader.push("League");
const parks_numeric = [false, true, true, false];

export const parks_header: {[key: string]: string | boolean; id: string}[] = [];
for (var l = 0; l < prheader.length; l++) {
  parks_header.push({
    id: prheader[l],
    numeric: parks_numeric[l],
    defaultOrder: "desc",
    label: prheader[l]
  });
}

export const parks_body: {[key: string]: string}[] = [];
for (var m = 0; m < parks.length; m++) {
  var pk: {[key: string]: string} = { 球場: parks[m]["球場"] };
  pk["得点PF"] = parks[m]["2019"]["得点PF"];
  pk["HRPF"] = parks[m]["2019"]["HRPF"];
  pk["League"] = "";
  parks_body.push(createData(pk));
}

export const parks_total_body: {[key: string]: string}[] = [];
for (var n = 0; n < parks.length; n++) {
  var tpk: {[key: string]: string} = { 球場: parks[n]["球場"] };
  tpk["得点PF"] = parks[n]["得点PF"];
  tpk["HRPF"] = parks[n]["HRPF"];
  tpk["League"] = "";
  parks_total_body.push(createData(tpk));
}
