import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import nomarlizeNumber from '../utils/normalizeNumber';
import { getIncomeTax, getInsurance } from '../utils/tax';
import { INSURANCE } from '../constant';

const style = theme => ({
  span: {
    color: orange[500]
  },
  btnLabel: {
    justifyContent: 'flex-start'
  }
});

const Text = ({ classes, label, value, city }) => (
  <span>
    <span className={classes.span}>{city}</span>
    {label}
    <span className={classes.span}>{value}</span>
  </span>
);

const MyLink = props => <Link to="/city" {...props} />;

class CalYearTax extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cityIdx: PropTypes.number.isRequired,
    compute: PropTypes.func.isRequired,
    switchType: PropTypes.func.isRequired
  };

  state = {
    monthIncome: '',
    insurance: '',
    iBase: '',
    hACBase: '',
    additional: '',
    checkProvident: true
  };

  handleClick = e => {
    const { monthIncome, insurance, additional } = this.state;
    if (monthIncome && insurance) {
      e.preventDefault();
      const oTax = getIncomeTax(monthIncome, insurance, 12, +additional);
      const aMonthTax = new Array(12).fill(1).map((value, idx) => {
        // 1月数据单算
        if (!idx) {
          const { tax: t, income: i, afterTax: a } = getIncomeTax(
            monthIncome,
            insurance,
            1,
            +additional
          );
          return {
            tax: t,
            income: i,
            afterTax: a
          };
        }
        // 当月 - 上月
        const current = getIncomeTax(
          monthIncome,
          insurance,
          idx + 1,
          +additional
        );
        const prev = getIncomeTax(monthIncome, insurance, idx, +additional);
        const tax = +(current.tax - prev.tax).toFixed(2);
        const income = +monthIncome;
        const afterTax = +(income - tax - +insurance).toFixed(2);
        return {
          tax,
          income,
          afterTax
        };
      });
      this.props.history.push('/result');
      this.props.switchType(1);
      this.props.compute({
        ...oTax,
        aMonthTax,
        insurance,
        additional: +additional * 12
      });
    }
  };

  handleChange = name => event => {
    const { cityIdx } = this.props;
    const { minIBase, maxIBase, minHACBase, maxHACBase } = INSURANCE[cityIdx];
    if (name === 'checkProvident') {
      const { checked } = event.target;
      this.setState(({ iBase, hACBase }) => {
        const insurance = getInsurance(iBase, hACBase, cityIdx, checked);
        return {
          checkProvident: checked,
          insurance
        };
      });
      return;
    }
    const { value } = event.target;
    this.setState({ [name]: value });
    if (name === 'monthIncome') {
      this.setState(({ checkProvident }) => {
        const iBase = nomarlizeNumber(value, minIBase, maxIBase);
        const hACBase = nomarlizeNumber(value, minHACBase, maxHACBase);
        const insurance = getInsurance(iBase, hACBase, cityIdx, checkProvident);
        return {
          iBase,
          hACBase,
          insurance
        };
      });
    }
  };

  handleBlur = name => event => {
    const { cityIdx } = this.props;
    const { minIBase, maxIBase, minHACBase, maxHACBase } = INSURANCE[cityIdx];
    if (name === 'iBase' || name === 'hACBase') {
      this.setState(state => {
        const _value = nomarlizeNumber(
          state[name],
          name === 'iBase' ? minIBase : minHACBase,
          name === 'iBase' ? maxIBase : maxHACBase
        );
        const insurance =
          name === 'iBase'
            ? getInsurance(_value, state.hACBase, cityIdx, state.checkProvident)
            : getInsurance(state.iBase, _value, cityIdx, state.checkProvident);
        return {
          [name]: _value,
          insurance
        };
      });
    }
  };

  render() {
    const { classes, cityIdx } = this.props;
    const {
      monthIncome,
      insurance,
      iBase,
      hACBase,
      additional,
      checkProvident
    } = this.state;
    const { city, minIBase, maxIBase, minHACBase, maxHACBase } = INSURANCE[
      cityIdx
    ];
    return (
      <Grid container spacing={24} justify="flex-end" component="form">
        <Grid item xs={12}>
          <Button
            size="small"
            variant="contained"
            fullWidth
            classes={{ label: classes.btnLabel }}
            component={MyLink}
          >
            <Icon color="inherit">place</Icon>
            {city}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="monthIncome"
            label="月均工资收入(元)"
            fullWidth
            type="number"
            value={monthIncome}
            onChange={this.handleChange('monthIncome')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="insurance"
            label="五险一金(元)"
            fullWidth
            helperText="*根据缴纳基数计算，可手动修改"
            type="number"
            value={insurance}
            onChange={this.handleChange('insurance')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="iBase"
            label="社保缴纳基数(元)"
            value={iBase}
            fullWidth
            helperText={
              <Text
                classes={classes}
                city={city}
                label="社保缴纳基数范围："
                value={`${minIBase}-${maxIBase}`}
              />
            }
            type="number"
            onChange={this.handleChange('iBase')}
            onBlur={this.handleBlur('iBase')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="hACBase"
            label="公积金缴纳基数(元)"
            value={hACBase}
            onChange={this.handleChange('hACBase')}
            onBlur={this.handleBlur('hACBase')}
            fullWidth
            disabled={!checkProvident}
            helperText={
              <Text
                classes={classes}
                city={city}
                label="公积金缴纳基数范围："
                value={`${minHACBase}-${maxHACBase}`}
              />
            }
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="additional"
            label="专项附加扣除(元/月)"
            value={additional}
            onChange={this.handleChange('additional')}
            onBlur={this.handleBlur('additional')}
            fullWidth
            type="number"
            helperText="*专项附加扣除请在个人所得税APP中申报查看"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Checkbox
                value="checkProvident"
                checked={checkProvident}
                onChange={this.handleChange('checkProvident')}
              />
            }
            label="汇缴住房公积金"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.handleClick}
            type="submit"
          >
            计算
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(CalYearTax);
