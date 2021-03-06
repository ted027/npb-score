import blue from "@material-ui/core/colors/blue";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { StyleRules } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    width: "100%",
  },
  individualRoot: {
    width: "100%",
    marginTop: theme.spacing(16)
  },
  tableWrapper: {
    overflowX: "auto"
  },
  tab: {
    flexGrow: 1,
  },
  subtab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "black",
    marginTop: 72
  },
  des: {
    backgroundColor: blue[600],
    color: theme.palette.common.white,
    height: 35,
  },
  des2: {
    backgroundColor: "rgba(0,0,0,0)",
    color: theme.palette.common.white,
    fontSize: "100%",
    height: 36,
  },
  tableButton: {
    width: "100%",
    maxWidth: 140,
  },
  adTypo: {
    display: "flex",
    margin: "auto",
    maxWidth: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  adA: {
    fontSize: "70%"
  },
  adImgWide: {
    margin: "auto",
    width: "100%",
    maxWidth: "720px",
    height: "width",
    marginTop: theme.spacing(1)
  },
  adImg: {
    margin: "auto",
    width: "100%",
    maxWidth: "300px",
    height: "width",
    marginTop: theme.spacing(1)
  },
  bottom2Fab: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(11),
    zIndex: theme.zIndex.appBar + 2
  },
  bottom1Fab: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 2
  },
  textField: {
    width: "100%"
  },
  searchButton: {
    width: "50%",
    position: "absolute",
    right: 2
  },
  resetButton: {
    width: "60%",
    position: "absolute",
    left: 2
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  selectYearForm: {
    top: theme.spacing(3),
    right: theme.spacing(5),
    position: "fixed",
    transition: theme.transitions.create('width'),
    zIndex: theme.zIndex.appBar + 1
  },
  yearPopPaper: {
    width: 80,
    zIndex: theme.zIndex.appBar + 2
  },
  popper: {
    zIndex: theme.zIndex.appBar + 3
  }
});

export default styles;