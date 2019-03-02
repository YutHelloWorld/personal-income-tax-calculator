import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { switchCity } from '../store/city';
import CalYearTax from '../component/CalYearTax';

const mapStateToProps = state => ({
  cityIdx: state.cityIdx
});

const mapDispatchToProps = {
  switchCity
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CalYearTax)
);
