import { connect } from 'react-redux';
import Result from '../component/Result';

const mapStateToProps = state => ({
  result: state.calc.result,
  type: state.calc.type
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
