import { connect } from "react-redux";
import Main from "../components/Main";
import { state } from "../reducers";

const mapStateToProps = (state: state) => {
  return {
    pageState: state.MainPage,
    yearState: state.Years
  };
};

const VisibleRecords = connect(mapStateToProps)(Main);

export default VisibleRecords;
