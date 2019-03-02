import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import YearEndBonus from '../component/YearEndBonus';
import { computeWithCb, switchTypeWithCb } from '../store/result';

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  compute: computeWithCb,
  switchType: switchTypeWithCb
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(YearEndBonus)
);
