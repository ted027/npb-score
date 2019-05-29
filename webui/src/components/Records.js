import teamsj from "../records/teams.json";
import parksj from "../records/parks.json";

const teams = teamsj.Team;
const parks = parksj.Park;

const theader = Object.keys(teams[0]);
const teams_numeric = [false, true, true, true, true, true, false];

export const teams_header = [];
for (var i = 0; i < 7; i++) {
  teams_header.push({
    id: theader[i],
    numeric: teams_numeric[i],
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
