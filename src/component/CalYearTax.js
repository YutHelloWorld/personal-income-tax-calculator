import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import nomarlizeNumber from '../utils/normalizeNumber';
import { getIncomeTax, getInsurance } from '../utils/tax';

const style = theme => ({
  span: {
    color: orange[500]
  }
});

const Text = ({ classes, label, value }) => (
  <span>
    {label}
    <span className={classes.span}>{value}</span>
  </span>
);

class CalYearTax extends Component {
  state = {
    monthIncome: '',
    insurance: '',
    insuranceBase: '',
    minInsuranceBase: 3054.95,
    maxInsuranceBase: 15274.74,
    providentFundBase: '',
    minProvidentFundBase: 2010,
    maxProvidentFundBase: 24311,
    checkProvident: true
  };

  handleClick = e => {
    const { monthIncome, insurance } = this.state;
    if (monthIncome && insurance) {
      e.preventDefault();
      const oTax = getIncomeTax(monthIncome, insurance);
      this.props.history.push({
        pathname: '/result',
        state: { ...oTax, type: 1 }
      });
    }
  };

  handleChange = name => event => {
    if (name === 'checkProvident') {
      const { checked } = event.target;
      this.setState(({ insuranceBase, providentFundBase, checkProvident }) => {
        const insurance = getInsurance(
          insuranceBase,
          providentFundBase,
          checked
        );
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
      this.setState(
        ({
          minInsuranceBase,
          maxInsuranceBase,
          minProvidentFundBase,
          maxProvidentFundBase,
          checkProvident
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
          const insurance = getInsurance(
            insuranceBase,
            providentFundBase,
            checkProvident
          );
          return {
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
            ? getInsurance(
                _value,
                state.providentFundBase,
                state.checkProvident
              )
            : getInsurance(state.insuranceBase, _value, state.checkProvident);
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
      monthIncome,
      insurance,
      insuranceBase,
      providentFundBase,
      minInsuranceBase,
      maxInsuranceBase,
      minProvidentFundBase,
      maxProvidentFundBase,
      checkProvident
    } = this.state;
    return (
      <Grid container spacing={24} justify="flex-end" component="form">
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
            disabled={!checkProvident}
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
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value="checkProvident"
                checked={checkProvident}
                onChange={this.handleChange('checkProvident')}
              />
            }
            label="缴纳公积金"
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
