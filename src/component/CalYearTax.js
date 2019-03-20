import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';
import { Place } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
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
  },
  formControl: {
    marginLeft: theme.spacing.unit
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
    IBase: '',
    HACBase: '',
    additional: '',
    checkProvident: true,
    HACRate: INSURANCE[this.props.cityIdx].HACRates[0]
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
    const { IBases, HACBases } = INSURANCE[cityIdx];
    if (name === 'checkProvident') {
      const { checked } = event.target;
      this.setState(({ IBase, HACBase, HACRate }) => {
        const insurance = getInsurance(
          IBase,
          HACBase,
          cityIdx,
          checked,
          HACRate
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
      this.setState(({ checkProvident, HACRate }) => {
        const IBase = nomarlizeNumber(value, IBases);
        const HACBase = nomarlizeNumber(value, HACBases);
        const insurance = getInsurance(
          IBase,
          HACBase,
          cityIdx,
          checkProvident,
          HACRate
        );
        return {
          IBase,
          HACBase,
          insurance
        };
      });
    }
  };

  handleBlur = name => event => {
    const { cityIdx } = this.props;
    const { IBases, HACBases } = INSURANCE[cityIdx];
    if (name === 'IBase' || name === 'HACBase') {
      this.setState(state => {
        const _value = nomarlizeNumber(
          state[name],
          name === 'IBase' ? IBases : HACBases
        );
        const insurance =
          name === 'IBase'
            ? getInsurance(
                _value,
                state.HACBase,
                cityIdx,
                state.checkProvident,
                state.HACRate
              )
            : getInsurance(
                state.IBase,
                _value,
                cityIdx,
                state.checkProvident,
                state.HACRate
              );
        return {
          [name]: _value,
          insurance
        };
      });
    }
  };

  handleSlect = event => {
    const r = +event.target.value;
    this.setState(state => {
      const insurance = getInsurance(
        state.IBase,
        state.HACBase,
        this.props.cityIdx,
        state.checkProvident,
        r
      );
      return {
        HACRate: r,
        insurance
      };
    });
  };
  render() {
    const { classes, cityIdx } = this.props;
    const {
      monthIncome,
      insurance,
      IBase,
      HACBase,
      additional,
      checkProvident
    } = this.state;
    const { city, IBases, HACBases } = INSURANCE[cityIdx];
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
            <Place color="inherit" />
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
            id="IBase"
            label="社保缴纳基数(元)"
            value={IBase}
            fullWidth
            helperText={
              <Text
                classes={classes}
                city={city}
                label="社保缴纳基数范围："
                value={`${IBases[0]}-${IBases[1]}`}
              />
            }
            type="number"
            onChange={this.handleChange('IBase')}
            onBlur={this.handleBlur('IBase')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="HACBase"
            label="公积金缴纳基数(元)"
            value={HACBase}
            onChange={this.handleChange('HACBase')}
            onBlur={this.handleBlur('HACBase')}
            fullWidth
            disabled={!checkProvident}
            helperText={
              <Text
                classes={classes}
                city={city}
                label="公积金缴纳基数范围："
                value={`${HACBases[0]}-${HACBases[1]}`}
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
          <FormControl
            className={classes.formControl}
            disabled={!checkProvident}
          >
            <InputLabel htmlFor="HACRate">比例</InputLabel>
            <Select
              value={this.state.HACRate}
              onChange={this.handleSlect}
              inputProps={{
                name: 'HACRate',
                id: 'HACRate'
              }}
            >
              <MenuItem value={0.05}>5%</MenuItem>
              <MenuItem value={0.06}>6%</MenuItem>
              <MenuItem value={0.07}>7%</MenuItem>
              <MenuItem value={0.08}>8%</MenuItem>
              <MenuItem value={0.09}>9%</MenuItem>
              <MenuItem value={0.1}>10%</MenuItem>
              <MenuItem value={0.11}>11%</MenuItem>
              <MenuItem value={0.12}>12%</MenuItem>
            </Select>
          </FormControl>
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
