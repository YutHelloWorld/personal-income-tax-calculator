import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CalYearTax from '../component/CalYearTax';
import { computeWithCb, switchTypeWithCb } from '../store/result';
import { writeInput } from '../store/input';

const mapStateToProps = state => ({
  ...state.input
});

const mapDispatchToProps = {
  compute: computeWithCb,
  switchType: switchTypeWithCb,
  writeInput
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CalYearTax)
);
