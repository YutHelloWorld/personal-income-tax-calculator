import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import Typography from '@material-ui/core/Typography';
import find from '../utils/find';

const style = theme => ({
  span: {
    color: orange[500]
  }
});

function getInsurance(insuranceBase, providentFundBase) {
  return (insuranceBase * 0.11 + providentFundBase * 0.12).toFixed(2);
}

const Text = ({ classes, label, value }) => (
  <span>
    {label}
    <span className={classes.span}>{value}</span>
  </span>
);

function getYearIncomeTax(
  income,
  insurance,
  deduction = 0,
  threshold = 5000,
  month = 12
) {
  const taxableIncome = (+income - +insurance - deduction - threshold) * month;
  const aRange = [36000, 144000, 300000, 420000, 660000, 960000];
  const aTaxRate = [3, 10, 20, 25, 30, 35, 45];
  const aQuickDeduction = [0, 2520, 16920, 31920, 52920, 85920, 181920];
  const index = find(aRange, taxableIncome);
  const taxRate = aTaxRate[index];
  const quickDeduction = aQuickDeduction[index];
  const yearTax = ((taxableIncome * taxRate) / 100 - quickDeduction).toFixed(2);
  return { taxRate, quickDeduction, yearTax };
}

function nomarlizeNumber(value, min, max) {
  const _value = +value;
  return _value >= min ? (_value <= max ? _value : max) : min;
}

class CalYearTax extends Component {
  state = {
    btnDisabled: true,
    monthIncome: '',
    insurance: '',
    insuranceBase: '',
    minInsuranceBase: 3054.95,
    maxInsuranceBase: 15274.74,
    providentFundBase: '',
    minProvidentFundBase: 2010,
    maxProvidentFundBase: 24311
  };

  handleClick = () => {
    const { monthIncome, insurance } = this.state;
    const v = getYearIncomeTax(monthIncome, insurance);
    console.log(v);
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
    if (name === 'monthIncome') {
      this.setState(
        ({
          minInsuranceBase,
          maxInsuranceBase,
          minProvidentFundBase,
          maxProvidentFundBase
        }) => {
          const insuranceBase = nomarlizeNumber(
            value,
            minInsuranceBase,
            maxInsuranceBase
          );
          const providentFundBase = nomarlizeNumber(
            value,
            minProvidentFundBase,
            maxProvidentFundBase
          );
          const insurance = getInsurance(insuranceBase, providentFundBase);
          return {
            btnDisabled: !value,
            insuranceBase,
            providentFundBase,
            insurance
          };
        }
      );
    }
  };

  handleBlur = name => event => {
    if (name === 'insuranceBase' || name === 'providentFundBase') {
      this.setState(state => {
        const _value = nomarlizeNumber(
          state[name],
          name === 'insuranceBase'
            ? state.minInsuranceBase
            : state.minProvidentFundBase,
          name === 'insuranceBase'
            ? state.maxInsuranceBase
            : state.maxProvidentFundBase
        );
        const insurance =
          name === 'insuranceBase'
            ? getInsurance(_value, state.providentFundBase)
            : getInsurance(state.insuranceBase, _value);
        return {
          [name]: _value,
          insurance
        };
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      btnDisabled,
      monthIncome,
      insurance,
      insuranceBase,
      providentFundBase,
      minInsuranceBase,
      maxInsuranceBase,
      minProvidentFundBase,
      maxProvidentFundBase
    } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={24} justify="flex-end">
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
              helperText="*根据应发工资计算，可手动修改"
              type="number"
              value={insurance}
              onChange={this.handleChange('insurance')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="default">
              五险一金的缴纳根据缴纳基数计算，缴纳基数一般为个人税前工资。如公司按最低缴纳计算等特殊情况，可以公司人事得知。在下方输入社保和公积金缴纳基数，既可计算五险一金的金额。
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="insuranceBase"
              label="社保缴纳基数(元)"
              value={insuranceBase}
              fullWidth
              helperText={
                <Text
                  classes={classes}
                  label="杭州市社保缴纳基数范围："
                  value={`${minInsuranceBase}-${maxInsuranceBase}`}
                />
              }
              type="number"
              onChange={this.handleChange('insuranceBase')}
              onBlur={this.handleBlur('insuranceBase')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="providentFundBase"
              label="公积金缴纳基数(元)"
              value={providentFundBase}
              onChange={this.handleChange('providentFundBase')}
              onBlur={this.handleBlur('providentFundBase')}
              fullWidth
              helperText={
                <Text
                  classes={classes}
                  label="杭州市公积金缴纳基数范围："
                  value={`${minProvidentFundBase}-${maxProvidentFundBase}`}
                />
              }
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              disabled={btnDisabled}
              variant="contained"
              fullWidth
              color="primary"
              onClick={this.handleClick}
            >
              计算
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(CalYearTax);
