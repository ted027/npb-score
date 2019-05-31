import teamsj from "../records/teams.json";
import parksj from "../records/parks.json";
import hittersj from "../records/hitters.json";
import pitchersj from "../records/pitchers.json";

const teams = teamsj.Team;
const parks = parksj.Park;
const hitters = hittersj.Hitter;
const pitchers = pitchersj.Pitcher;

function createHeader(array, regulated) {
  const header = [
    {
      id: "名前",
      numeric: false,
      regulated: false,
      disablePadding: true,
      label: ""
    }
  ];
  for (var i = 0; i < array.length; i++) {
    header.push({
      id: array[i],
      numeric: true,
      regulated: regulated[i],
      disablePadding: true,
      label: array[i]
    });
  }
  return header;
}

function createBody(array, head) {
  const body = [];
  for (var j = 0; j < array.length; j++) {
    var name =
      array[j]["Name"].split(" ")[0] +
      " (" +
      array[j]["Team"].slice(0, 1) +
      ")";
    const body_player = { 名前: name };
    for (var k = 0; k < head.length; k++) {
      body_player[head[k]] = array[j][head[k]];
    }
    body.push(createData(body_player));
  }
  return body;
}

const hheader_award = [
  "打率",
  "安打",
  "本塁打",
  "打点",
  "盗塁",
  "規定",
  "League"
];
const hheader_award_regulated = [
  true,
  false,
  false,
  false,
  false,
  false,
  false
];
export const hitters_header_award = createHeader(
  hheader_award,
  hheader_award_regulated
);
export const hitters_body_award = createBody(hitters, hheader_award);
console.log(hitters_body_award);

const theader = Object.keys(teams[0]);
const teams_numeric = [false, true, true, true, true, true, false];

export const teams_header = [];
for (var i = 0; i < 7; i++) {
  teams_header.push({
    id: theader[i],
    numeric: teams_numeric[i],
    regulated: false,
    disablePadding: true,
    label: theader[i]
  });
}

var del_elements = ["本拠地", "非本拠地"];
export const teams_body = [];
for (var j = 0; j < teams.length; j++) {
  for (var key in del_elements) {
    delete teams[j][key];
  }
  teams_body.push(createData(teams[j]));
}

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

function createData(json) {
  var keys = Object.keys(json);
  var values = Object.values(json);
  var row = {};
  for (var k = 0; k < keys.length; k++) {
    row[keys[k]] = values[k];
  }
  return row;
}
