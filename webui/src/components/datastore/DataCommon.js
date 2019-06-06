export function createHeader(array, regulated, order) {
  const header = [
    {
      id: "選手",
      numeric: false,
      regulated: false,
      disablePadding: true,
      label: "選手"
    }
  ];
  for (var i = 0; i < array.length; i++) {
    header.push({
      id: array[i],
      numeric: true,
      defaultOrder: order[i],
      regulated: regulated[i],
      disablePadding: true,
      label: array[i]
    });
  }
  return header;
}

function createNameContent(name, team) {
  return name + "（" + team + "）";
}

export function createBody(array, head) {
  const body = [];
  for (var j = 0; j < array.length; j++) {
    var name = createNameContent(array[j]["Name"], array[j]["Team"]);
    const body_player = { 選手: name };
    for (var k = 0; k < head.length; k++) {
      body_player[head[k]] = array[j][head[k]];
    }
    body.push(createData(body_player));
  }
  return body;
}

export function createData(json) {
  var keys = Object.keys(json);
  var row = {};
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
  DeNA: "横浜ＤｅＮＡベイスターズ",
  中日: "中日ドラゴンズ",
  阪神: "阪神タイガース"
};
