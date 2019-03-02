import { connect } from 'react-redux';
import { switchCity } from '../store/city';
import City from '../component/City';

const mapStateToProps = state => ({
  cityIdx: state.cityIdx
});

const mapDispatchToProps = {
  switchCity
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
