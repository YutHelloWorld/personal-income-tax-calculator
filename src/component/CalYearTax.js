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
import { INSURANCE, HAC_RATE } from '../constant';

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
    monthIncome: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    insurance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    IBase: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    HACBase: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    additional: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    checkProvident: PropTypes.bool.isRequired,
    compute: PropTypes.func.isRequired,
    switchType: PropTypes.func.isRequired,
    writeInput: PropTypes.func.isRequired
  };

  handleClick = e => {
    const { monthIncome, insurance, additional } = this.props;
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
    const {
      cityIdx,
      writeInput,
      IBase,
      HACBase,
      HACRate,
      checkProvident
    } = this.props;
    const { IBases, HACBases } = INSURANCE[cityIdx];
    let insurance;
    if (name === 'checkProvident') {
      const { checked } = event.target;
      insurance = getInsurance(IBase, HACBase, cityIdx, checked, HACRate);
      writeInput({ checkProvident: checked, insurance });
      return;
    }

    const { value } = event.target;
    if (name === 'monthIncome') {
      const IBase = nomarlizeNumber(value, IBases);
      const HACBase = nomarlizeNumber(value, HACBases);
      insurance = getInsurance(
        IBase,
        HACBase,
        cityIdx,
        checkProvident,
        HACRate
      );

      writeInput({
        IBase,
        HACBase,
        insurance,
        [name]: value
      });
      return;
    }

    if (name === 'HACRate') {
      insurance = getInsurance(IBase, HACBase, cityIdx, checkProvident, value);
      writeInput({
        insurance,
        [name]: value
      });
      return;
    }
    writeInput({ [name]: value });
  };

  handleBlur = name => event => {
    const {
      cityIdx,
      HACBase,
      checkProvident,
      HACRate,
      IBase,
      writeInput
    } = this.props;
    const { IBases, HACBases } = INSURANCE[cityIdx];

    const _value = nomarlizeNumber(
      this.props[name],
      name === 'IBase' ? IBases : HACBases
    );
    const insurance =
      name === 'IBase'
        ? getInsurance(_value, HACBase, cityIdx, checkProvident, HACRate)
        : getInsurance(IBase, _value, cityIdx, checkProvident, HACRate);
    writeInput({
      [name]: _value,
      insurance
    });
  };

  render() {
    const {
      classes,
      cityIdx,
      monthIncome,
      insurance,
      IBase,
      HACBase,
      additional,
      checkProvident,
      HACRate
    } = this.props;
    const { city, IBases, HACBases } = INSURANCE[cityIdx];
    return (
      <Grid
        container
        spacing={24}
        justify="flex-end"
        component="form"
        onSubmit={this.handleClick}
      >
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
            type="tel"
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
            type="tel"
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
            type="tel"
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
            type="tel"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="additional"
            label="专项附加扣除(元/月)"
            value={additional}
            onChange={this.handleChange('additional')}
            fullWidth
            type="tel"
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
              value={HACRate}
              onChange={this.handleChange('HACRate')}
              inputProps={{
                name: 'HACRate',
                id: 'HACRate'
              }}
            >
              {HAC_RATE.map(i => (
                <MenuItem value={i[0]} key={i[1]}>
                  {i[1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" fullWidth color="primary" type="submit">
            计算
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(CalYearTax);
