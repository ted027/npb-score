import { connect } from "react-redux";
import MainApp from "../components/MainApp";
import { state } from "../reducers";

const mapStateToProps = (state: state) => {
  return {
    pageState: state.MainPage,
    yearState: state.Years
  };
};

const VisibleApp = connect(mapStateToProps)(MainApp);

export default VisibleApp;
