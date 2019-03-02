import { connect } from 'react-redux';
import { switchCityWithCb } from '../store/city';
import City from '../component/City';

const mapStateToProps = state => ({
  cityIdx: state.cityIdx
});

const mapDispatchToProps = {
  switchCity: switchCityWithCb
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
