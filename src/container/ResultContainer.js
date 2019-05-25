import { connect } from 'react-redux';
import Result from '../component/Result';

const mapStateToProps = state => ({
  result: state.calc.result,
  type: state.calc.type,
  mode: state.input.mode,
  month: state.monthInput.month
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
