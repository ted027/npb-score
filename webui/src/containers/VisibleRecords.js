import { connect } from 'react-redux';
import Main from './components/Main';

const mapStateToProps = (state) => {
    return { pageState: state.MainPage }
}

const VisibleRecords = connect(
    mapStateToProps
)(Main)

export default VisibleRecords;
