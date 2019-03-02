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
import { withRouter, Link } from 'react-router-dom';
import nomarlizeNumber from '../utils/normalizeNumber';
import { getIncomeTax, getInsurance } from '../utils/tax';

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
    classes: PropTypes.object.isRequired
  };

  state = {
    monthIncome: '',
    insurance: '',
    iBase: '',
    hACBase: '',
    checkProvident: true
  };

  handleClick = e => {
    const { monthIncome, insurance } = this.state;
    if (monthIncome && insurance) {
      e.preventDefault();
      const oTax = getIncomeTax(monthIncome, insurance);
      const aMonthTax = new Array(12).fill(1).map((value, idx) => {
        // 1月数据单算
        if (!idx) {
          const { tax: t, income: i, afterTax: a } = getIncomeTax(
            monthIncome,
            insurance,
            1
          );
          return {
            tax: t,
            income: i,
            afterTax: a
          };
        }
        // 当月 - 上月
        const current = getIncomeTax(monthIncome, insurance, idx + 1);
        const prev = getIncomeTax(monthIncome, insurance, idx);
        const tax = +(current.tax - prev.tax).toFixed(2);
        const income = +monthIncome;
        const afterTax = +(income - tax - +insurance).toFixed(2);
        return {
          tax,
          income,
          afterTax
        };
      });
      this.props.history.push({
        pathname: '/result',
        state: { result: { ...oTax, aMonthTax, insurance }, type: 1 }
      });
    }
  };

  handleChange = name => event => {
    const {
      minIBase, // 最低社保基数
      maxIBase, // 最高社保基数
      minHACBase, // 最低公积金基数
      maxHACBase, // 最高公积金基数
      idx
    } = this.props;
    if (name === 'checkProvident') {
      const { checked } = event.target;
      this.setState(({ iBase, hACBase, checkProvident }) => {
        const insurance = getInsurance(iBase, hACBase, idx, checked);
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
        const insurance = getInsurance(iBase, hACBase, idx, checkProvident);
        return {
          iBase,
          hACBase,
          insurance
        };
      });
    }
  };

  handleBlur = name => event => {
    const {
      minIBase, // 最低社保基数
      maxIBase, // 最高社保基数
      minHACBase, // 最低公积金基数
      maxHACBase, // 最高公积金基数
      idx
    } = this.props;
    if (name === 'iBase' || name === 'hACBase') {
      this.setState(state => {
        const _value = nomarlizeNumber(
          state[name],
          name === 'iBase' ? minIBase : minHACBase,
          name === 'iBase' ? maxIBase : maxHACBase
        );
        const insurance =
          name === 'iBase'
            ? getInsurance(_value, state.hACBase, idx, state.checkProvident)
            : getInsurance(state.iBase, _value, idx, state.checkProvident);
        return {
          [name]: _value,
          insurance
        };
      });
    }
  };

  render() {
    const {
      classes,
      city,
      minIBase,
      maxIBase,
      minHACBase,
      maxHACBase
    } = this.props;
    const {
      monthIncome,
      insurance,
      iBase,
      hACBase,
      checkProvident
    } = this.state;
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
        <Grid item xs={12}>
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

export default withRouter(withStyles(style)(CalYearTax));
