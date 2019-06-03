export function createHeader(array, regulated, order) {
  const header = [
    {
      id: "名前",
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

export function createBody(array, head) {
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

export function createData(json) {
  var keys = Object.keys(json);
  var row = {};
  for (var k = 0; k < keys.length; k++) {
    row[keys[k]] = json[keys[k]];
  }
  return row;
}
