import teamsj from "../../records/teams.json";
import parksj from "../../records/parks.json";
import { createData, teamConverter } from "./DataCommon";

const teams = teamsj.Team;
const parks = parksj.Park;

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

export function createTeamBody(array, head) {
  const body = [];
  for (var j = 0; j < array.length; j++) {
    const body_team = {};
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

export const teams_header = [];
for (var i = 0; i < theader.length; i++) {
  teams_header.push({
    id: theader[i],
    numeric: teams_numeric[i],
    label: theader[i]
  });
}

export const teams_body = createTeamBody(teams, theader);

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

export const teams_atk_header = [];
for (var i = 0; i < t_atk_header.length; i++) {
  teams_atk_header.push({
    id: t_atk_header[i],
    numeric: teams_atk_numeric[i],
    defaultOrder: teams_atk_order[i],
    label: t_atk_header[i]
  });
}

export const teams_atk_body = createTeamBody(teams, t_atk_header);

const t_def_header = [
  "チーム",
  "失点",
  "防御率",
  "奪三振",
  "与四球",
  "被本塁打",
  "League"
];

const teams_def_numeric = [false, true, true, true, true, true, false];

const teams_def_order = ["desc", "asc", "asc", "desc", "asc", "asc", "desc"];

export const teams_def_header = [];
for (var i = 0; i < t_def_header.length; i++) {
  teams_def_header.push({
    id: t_def_header[i],
    numeric: teams_def_numeric[i],
    defaultOrder: teams_def_order[i],
    label: t_def_header[i]
  });
}

export const teams_def_body = createTeamBody(teams, t_def_header);

// parks
//
//
var prheader = Object.keys(parks[0]);
prheader.push("League");
const parks_numeric = [false, true, true, false];

export const parks_header = [];
for (var l = 0; l < prheader.length; l++) {
  parks_header.push({
    id: prheader[l],
    numeric: parks_numeric[l],
    defaultOrder: "desc",
    label: prheader[l]
  });
}

export const parks_body = [];
for (var m = 0; m < parks.length; m++) {
  var pk = parks[m];
  pk["League"] = "";
  parks_body.push(createData(pk));
}
