import parksj from "../records/parks.json";
import { createData } from "./DataCommon";
import { strDict, strBoolDictWithId } from "../constants";


const parks: {球場: string; [key: string]: any}[] = parksj.Park;

var raw_prheader = Object.keys(parks[0]);
var prheader = raw_prheader.filter(function(raw_prh) {
  return raw_prh !== "2019";
});
prheader.push("League");
const parks_numeric = [false, true, true, false];

export const parks_header: strBoolDictWithId[] = [];
for (var l = 0; l < prheader.length; l++) {
  parks_header.push({
    id: prheader[l],
    numeric: parks_numeric[l],
    defaultOrder: "desc",
    label: prheader[l]
  });
}

export const parks_body: strDict[] = [];
for (var m = 0; m < parks.length; m++) {
  var pk: strDict = { 球場: parks[m]["球場"] };
  pk["得点PF"] = parks[m]["2019"]["得点PF"];
  pk["HRPF"] = parks[m]["2019"]["HRPF"];
  pk["League"] = "";
  parks_body.push(createData(pk));
}

export const parks_total_body: strDict[] = [];
for (var n = 0; n < parks.length; n++) {
  var tpk: strDict = { 球場: parks[n]["球場"] };
  tpk["得点PF"] = parks[n]["得点PF"];
  tpk["HRPF"] = parks[n]["HRPF"];
  tpk["League"] = "";
  parks_total_body.push(createData(tpk));
}
