import teamsj2019 from "../../records/2019/teams.json";
// import teamsj2020 from "../../records/2020/teams.json";
import { createData, teamConverter } from "./DataCommon";
import { selectYears, strBoolDict, strBoolDictWithId } from "../../constants";



var yearJson = {
  '2019': teamsj2019.Team
}

const theader_stats = [
  "チーム",
  "試合",
  "勝利",
  "敗戦",
  "引分",
  "勝率",
  "勝差",
  "League"
];

const teams_numeric_stats = new Array(theader_stats.length).fill(false);

export function createTeamBody(array: {チーム: string; [key: string]: any}[], head: string[]) {
  const body: strBoolDict[] = [];
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

export const teams_header_stats: strBoolDictWithId[] = [];
for (var t = 0; t < theader_stats.length; t++) {
  teams_header_stats.push({
    id: theader_stats[t],
    numeric: teams_numeric_stats[t],
    label: theader_stats[t]
  });
}

const theader_offense = [
  "チーム",
  "得点",
  "打率",
  "本塁打",
  "四球",
  "盗塁",
  "League"
];

const teams_numeric_offense = [false, true, true, true, true, true, false];

const teams_order_offense = [
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc",
  "desc"
];

export const teams_header_offense: strBoolDictWithId[] = [];
for (var ta = 0; ta < theader_offense.length; ta++) {
  teams_header_offense.push({
    id: theader_offense[ta],
    numeric: teams_numeric_offense[ta],
    defaultOrder: teams_order_offense[ta],
    label: theader_offense[ta]
  });
}

const theader_defense = [
  "チーム",
  "失点",
  "防御率",
  "奪三振",
  "与四球",
  "被HR",
  "League"
];

const teams_numeric_defense = [false, true, true, true, true, true, false];

const teams_order_defense = ["desc", "asc", "asc", "desc", "asc", "asc", "desc"];

export const teams_header_defense: strBoolDictWithId[] = [];
for (var td = 0; td < theader_defense.length; td++) {
  teams_header_defense.push({
    id: theader_defense[td],
    numeric: teams_numeric_defense[td],
    defaultOrder: teams_order_defense[td],
    label: theader_defense[td]
  });
}

type teams_body = {
  stats: strBoolDict[],
  offense: strBoolDict[],
  defense: strBoolDict[]
}

export const teams_body_of_year = (year: selectYears): teams_body => {
  var teams = yearJson[year]
  return {
    stats: createTeamBody(teams, theader_stats),
    offense: createTeamBody(teams, theader_offense),
    defense: createTeamBody(teams, theader_defense)
  }
}

