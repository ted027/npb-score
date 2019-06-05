import teamsj from "../../records/teams.json";
import parksj from "../../records/parks.json";
import { createData } from "./DataCommon";

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
      body_team[head[k]] = array[j][head[k]];
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
    disablePadding: true,
    label: theader[i]
  });
}

export const teams_body = createTeamBody(teams, theader);

const trecheader = [
  "チーム",
  "得点",
  "打率",
  "本塁打",
  "盗塁",
  "失点",
  "防御率",
  "League"
];

const teams_rec_numeric = [false, true, true, true, true, true, true];

const teams_rec_order = ["desc", "desc", "desc", "desc", "desc", "asc", "asc"];

export const teams_rec_header = [];
for (var i = 0; i < trecheader.length; i++) {
  teams_rec_header.push({
    id: trecheader[i],
    numeric: teams_rec_numeric[i],
    defaultOrder: teams_rec_order[i],
    disablePadding: true,
    label: trecheader[i]
  });
}

export const teams_rec_body = createTeamBody(teams, trecheader);

// parks
//
//
const prheader = Object.keys(parks[0]);
const parks_numeric = [false, true, true];

export const parks_header = [];
for (var l = 0; l < Object.keys(parks[0]).length; l++) {
  parks_header.push({
    id: prheader[l],
    numeric: parks_numeric[l],
    disablePadding: true,
    label: prheader[l]
  });
}

export const parks_body = [];
for (var m = 0; m < parks.length; m++) {
  parks_body.push(createData(parks[m]));
}
