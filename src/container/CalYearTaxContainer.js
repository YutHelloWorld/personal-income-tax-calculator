import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CalYearTax from '../component/CalYearTax';
import { computeWithCb, switchTypeWithCb } from '../store/result';
import { writeInputWithCb as writeInput } from '../store/input';
import {
  writeMonthInputWithCb as writeMonthInput,
  selectMonthWithCb as selectMonth,
  nextMonthWithCb as nextMonth,
  copyWithCb as copy
} from '../store/month';

const mapStateToProps = state => ({
  ...state.input,
  monthInput: state.monthInput,
  result: state.calc.result
});

const mapDispatchToProps = {
  compute: computeWithCb,
  switchType: switchTypeWithCb,
  writeInput,
  writeMonthInput,
  selectMonth,
  nextMonth,
  copy
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CalYearTax)
);
