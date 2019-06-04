import React from "react";
import Tab from "@material-ui/core/Tab";

export const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    fontSize: "55%"
  },
  individualRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 14,
    fontSize: "55%"
  },
  table: {
    maxWidth: 320
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  subtab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "black",
    marginTop: 48
  },
  des: {
    height: 32,
    fontSize: "160%"
  },
  adTypo: {
    display: "flex",
    margin: "auto",
    maxWidth: "100%"
  },
  adA: {
    fontSize: "80%"
  },
  adImg: {
    margin: "auto",
    width: "100%",
    maxWidth: "720px",
    height: "width"
  }
});

export function LinkTab(props) {
  return <Tab component="a" onClick={event => {}} {...props} />;
}

export function getProperty(head, id, property) {
  for (var item of head) {
    if (item.id === id) {
      return item[property];
    }
  }
  return false;
}

export function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
  return order === "asc"
    ? (a, b) => a[orderBy] - b[orderBy]
    : (a, b) => b[orderBy] - a[orderBy];
}

export function zenkakuToHankaku(mae) {
  let zen = [
    "ア",
    "イ",
    "ウ",
    "エ",
    "オ",
    "カ",
    "キ",
    "ク",
    "ケ",
    "コ",
    "サ",
    "シ",
    "ス",
    "セ",
    "ソ",
    "タ",
    "チ",
    "ツ",
    "テ",
    "ト",
    "ナ",
    "ニ",
    "ヌ",
    "ネ",
    "ノ",
    "ハ",
    "ヒ",
    "フ",
    "ヘ",
    "ホ",
    "マ",
    "ミ",
    "ム",
    "メ",
    "モ",
    "ヤ",
    "ヰ",
    "ユ",
    "ヱ",
    "ヨ",
    "ラ",
    "リ",
    "ル",
    "レ",
    "ロ",
    "ワ",
    "ヲ",
    "ン",
    "ガ",
    "ギ",
    "グ",
    "ゲ",
    "ゴ",
    "ザ",
    "ジ",
    "ズ",
    "ゼ",
    "ゾ",
    "ダ",
    "ヂ",
    "ヅ",
    "デ",
    "ド",
    "バ",
    "ビ",
    "ブ",
    "ベ",
    "ボ",
    "パ",
    "ピ",
    "プ",
    "ペ",
    "ポ",
    "ァ",
    "ィ",
    "ゥ",
    "ェ",
    "ォ",
    "ャ",
    "ュ",
    "ョ",
    "ッ",
    "゛",
    "°",
    "ー",
    "・"
  ];

  let han = [
    "ｱ",
    "ｲ",
    "ｳ",
    "ｴ",
    "ｵ",
    "ｶ",
    "ｷ",
    "ｸ",
    "ｹ",
    "ｺ",
    "ｻ",
    "ｼ",
    "ｽ",
    "ｾ",
    "ｿ",
    "ﾀ",
    "ﾁ",
    "ﾂ",
    "ﾃ",
    "ﾄ",
    "ﾅ",
    "ﾆ",
    "ﾇ",
    "ﾈ",
    "ﾉ",
    "ﾊ",
    "ﾋ",
    "ﾌ",
    "ﾍ",
    "ﾎ",
    "ﾏ",
    "ﾐ",
    "ﾑ",
    "ﾒ",
    "ﾓ",
    "ﾔ",
    "ｲ",
    "ﾕ",
    "ｴ",
    "ﾖ",
    "ﾗ",
    "ﾘ",
    "ﾙ",
    "ﾚ",
    "ﾛ",
    "ﾜ",
    "ｦ",
    "ﾝ",
    "ｶﾞ",
    "ｷﾞ",
    "ｸﾞ",
    "ｹﾞ",
    "ｺﾞ",
    "ｻﾞ",
    "ｼﾞ",
    "ｽﾞ",
    "ｾﾞ",
    "ｿﾞ",
    "ﾀﾞ",
    "ﾁﾞ",
    "ﾂﾞ",
    "ﾃﾞ",
    "ﾄﾞ",
    "ﾊﾞ",
    "ﾋﾞ",
    "ﾌﾞ",
    "ﾍﾞ",
    "ﾎﾞ",
    "ﾊﾟ",
    "ﾋﾟ",
    "ﾌﾟ",
    "ﾍﾟ",
    "ﾎﾟ",
    "ｧ",
    "ｨ",
    "ｩ",
    "ｪ",
    "ｫ",
    "ｬ",
    "ｭ",
    "ｮ",
    "ｯ",
    "ﾞ",
    "ﾟ",
    "ｰ",
    "･"
  ];

  let ato = "";

  for (let i = 0; i < mae.length; i++) {
    let maechar = mae.charAt(i);
    let zenindex = zen.indexOf(maechar);
    if (zenindex >= 0) {
      maechar = han[zenindex];
    }
    ato += maechar;
  }

  return ato;
}
