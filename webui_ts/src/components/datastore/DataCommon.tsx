export function createHeader(array: string[], regulated: boolean[], order: string[]) {
  const header = [
    {
      id: "選手",
      numeric: false,
      defaultOrder: "",
      regulated: false,
      label: "選手"
    }
  ];
  for (var i = 0; i < array.length; i++) {
    header.push({
      id: array[i],
      numeric: true,
      defaultOrder: order[i],
      regulated: regulated[i],
      label: array[i]
    });
  }
  return header;
}

export function createHeaderRelief(array: string[], regulated: boolean[], order: string[], numeric: boolean[]) {
  const header = [
    {
      id: "選手",
      numeric: false,
      defaultOrder: "",
      regulated: false,
      label: "選手"
    }
  ];
  for (var i = 0; i < array.length; i++) {
    header.push({
      id: array[i],
      numeric: numeric[i],
      defaultOrder: order[i],
      regulated: regulated[i],
      label: array[i]
    });
  }
  return header;
}

function createNameContent(name: string, team: string) {
  return name + " (" + team + ")";
}

export function createBody(array: {Name: string; Team: string; [key: string]: any}[], head: string[]) {
  const body: {[key: string]: string | boolean}[] = [];
  for (var j = 0; j < array.length; j++) {
    var name: string = createNameContent(array[j]["Name"], array[j]["Team"]);
    var body_player: {[key: string]: any} = { 選手: name };
    for (var k = 0; k < head.length; k++) {
      body_player[head[k]] = array[j][head[k]];
    }
    body.push(createData(body_player));
  }
  return body;
}

export function createBodyClutch(array: {Name: string; Team: string; [key: string]: any}[], head: string[]) {
  const body : {[key: string]: string | boolean}[]= [];
  for (var j = 0; j < array.length; j++) {
    if (array[j][head[0]]) {
      var name: string = createNameContent(array[j]["Name"], array[j]["Team"]);
      const body_player: {[key: string]: any} = { 選手: name };
      for (var k = 0; k < head.length; k++) {
        body_player[head[k]] = array[j][head[k]];
      }
      body.push(createData(body_player));
    }
  }
  return body;
}

export function createData(json: {[key: string]: any}) {
  var keys: string[] = Object.keys(json);
  var row: {[key: string]: string} = {};
  for (var k = 0; k < keys.length; k++) {
    row[keys[k]] = json[keys[k]];
  }
  return row;
}

export const teamConverter = {
  西武: "埼玉西武ライオンズ",
  ソフトバンク: "福岡ソフトバンクホークス",
  日本ハム: "北海道日本ハムファイターズ",
  オリックス: "オリックスバファローズ",
  ロッテ: "千葉ロッテマリーンズ",
  楽天: "東北楽天ゴールデンイーグルス",
  広島: "広島東洋カープ",
  ヤクルト: "東京ヤクルトスワローズ",
  巨人: "読売ジャイアンツ",
  ＤｅＮＡ: "横浜ＤｅＮＡベイスターズ",
  中日: "中日ドラゴンズ",
  阪神: "阪神タイガース"
};
