import { connect } from 'react-redux';
import { writeInput, switchCityWithCb } from '../store/input';
import City from '../component/City';

const mapStateToProps = state => ({
  ...state.input
});

const mapDispatchToProps = {
  switchCity: switchCityWithCb,
  writeInput
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
