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
  FormControl,
  Switch
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

  handleMonthCal = e => {
    const {
      monthInput: { month, data },
      compute
    } = this.props;
    const { monthIncome, insurance, additional } = data[month];
    let aMonthTax = [];
    if (!month) {
      const oTax = getIncomeTax(monthIncome, insurance, 1, +additional);
      const { tax, income, afterTax } = oTax;
      aMonthTax = [{ tax, income, afterTax }];
      compute({
        ...oTax,
        aMonthTax,
        insurance,
        additional
      });
      this.props.history.push('/result');
      this.props.switchType(1);
      return;
    }
    let _income = 0,
      _insurance = 0,
      _additional = 0;
    data.some((el, i) => {
      if (i === month + 1) {
        return true;
      }
      _income += +el.monthIncome;
      _insurance += +el.insurance;
      _additional += +el.additional;
      return false;
    });

    for (let j = 0; j < month + 1; j++) {
      if (j === 0) {
        const oTax = getIncomeTax(
          data[0].monthIncome,
          data[0].insurance,
          1,
          +data[0].additional
        );
        const { tax, income, afterTax, totalInsurance } = oTax;
        aMonthTax.push({ tax, income, afterTax, insurance: totalInsurance });
        continue;
      }
      let m = 0,
        o = 0,
        n = 0,
        _m = 0,
        _o = 0,
        _n = 0;
      data.some((el, i) => {
        if (i === j + 1) {
          return true;
        }
        m += +el.monthIncome;
        o += +el.insurance;
        n += +el.additional;
        return false;
      });

      data.some((el, i) => {
        if (i === j) {
          return true;
        }
        _m += +el.monthIncome;
        _o += +el.insurance;
        _n += +el.additional;
        return false;
      });
      const next = getIncomeTax(m, o, 1, n, 5000 * (j + 1));
      const prev = getIncomeTax(_m, _o, 1, _n, 5000 * j);
      const tax = +data[j].monthIncome ? +(next.tax - prev.tax).toFixed(2) : 0;
      const income = +data[j].monthIncome;
      const afterTax = +(income - tax - +data[j].insurance).toFixed(2);
      aMonthTax.push({ tax, income, afterTax, insurance: data[j].insurance });
    }

    const current = getIncomeTax(
      _income,
      _insurance,
      1,
      _additional,
      5000 * (month + 1)
    );

    compute({
      ...current,
      aMonthTax,
      insurance: _insurance,
      additional: _additional
    });
    this.props.history.push('/result');
    this.props.switchType(1);
  };

  handleChange = name => event => {
    const {
      cityIdx,
      writeInput,
      writeMonthInput,
      selectMonth,
      IBase,
      HACBase,
      HACRate,
      checkProvident,
      mode,
      monthInput: { month, data }
    } = this.props;
    const { IBase: iB, HACBase: hB, checkProvident: cP, HACRate: hR } = data[
      month
    ];
    const { IBases, HACBases } = INSURANCE[cityIdx];
    let insurance;
    if (name === 'checkProvident') {
      const { checked } = event.target;
      insurance = getInsurance(
        mode ? iB : IBase,
        mode ? hB : HACBase,
        cityIdx,
        checked,
        mode ? hR : HACRate
      );
      mode
        ? writeMonthInput({
            checkProvident: checked,
            insurance
          })
        : writeInput({ checkProvident: checked, insurance });
      return;
    }

    if (name === 'mode') {
      const { checked } = event.target;
      writeInput({ [name]: checked });
      return;
    }
    const { value } = event.target;
    if (name === 'month') {
      selectMonth(value);
      return;
    }
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

      mode
        ? writeMonthInput({
            IBase,
            HACBase,
            insurance,
            [name]: value
          })
        : writeInput({
            IBase,
            HACBase,
            insurance,
            [name]: value
          });

      return;
    }

    if (name === 'HACRate') {
      insurance = getInsurance(
        mode ? iB : IBase,
        mode ? hB : HACBase,
        cityIdx,
        mode ? cP : checkProvident,
        value
      );
      mode
        ? writeMonthInput({
            insurance,
            [name]: value
          })
        : writeInput({
            insurance,
            [name]: value
          });
      return;
    }
    mode ? writeMonthInput({ [name]: value }) : writeInput({ [name]: value });
  };

  handleBlur = name => event => {
    const {
      cityIdx,
      HACBase,
      checkProvident,
      HACRate,
      IBase,
      writeInput,
      writeMonthInput,
      mode,
      monthInput: { month, data }
    } = this.props;
    const { IBases, HACBases } = INSURANCE[cityIdx];
    const { IBase: iB, HACBase: hB, checkProvident: cP, HACRate: hR } = data[
      month
    ];
    const _value = nomarlizeNumber(
      mode ? (name === 'IBase' ? iB : hB) : this.props[name],
      name === 'IBase' ? IBases : HACBases
    );
    const insurance =
      name === 'IBase'
        ? getInsurance(
            _value,
            mode ? hB : HACBase,
            cityIdx,
            mode ? cP : checkProvident,
            mode ? hR : HACRate
          )
        : getInsurance(
            mode ? iB : IBase,
            _value,
            cityIdx,
            mode ? cP : checkProvident,
            mode ? hR : HACRate
          );
    mode
      ? writeMonthInput({ [name]: _value, insurance })
      : writeInput({
          [name]: _value,
          insurance
        });
  };

  render() {
    const {
      classes,
      mode,
      cityIdx,
      monthIncome,
      insurance,
      IBase,
      HACBase,
      additional,
      checkProvident,
      HACRate,
      monthInput: { month, data },
      nextMonth,
      copy
    } = this.props;
    const {
      monthIncome: mI,
      insurance: iS,
      IBase: iB,
      HACBase: hB,
      checkProvident: cP,
      HACRate: hR,
      additional: ad
    } = data[month];
    const { city, IBases, HACBases } = INSURANCE[cityIdx];
    return (
      <Grid
        container
        spacing={24}
        // justify="flex-end"
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
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={mode}
                onChange={this.handleChange('mode')}
              />
            }
            label="月度模式"
            labelPlacement="start"
          />
        </Grid>
        {mode && (
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="month">选择月份</InputLabel>
              <Select
                inputProps={{
                  name: 'month',
                  id: 'month'
                }}
                value={month}
                onChange={this.handleChange('month')}
              >
                {new Array(12).fill('').map((el, i) => (
                  <MenuItem value={i} key={i}>
                    {`${i + 1}月`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="monthIncome"
            label="月收入(元)"
            fullWidth
            type="tel"
            value={mode ? mI : monthIncome}
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
            value={mode ? iS : insurance}
            onChange={this.handleChange('insurance')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="IBase"
            label="社保缴纳基数(元)"
            value={mode ? iB : IBase}
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
            value={mode ? hB : HACBase}
            onChange={this.handleChange('HACBase')}
            onBlur={this.handleBlur('HACBase')}
            fullWidth
            disabled={mode ? !cP : !checkProvident}
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
            value={mode ? ad : additional}
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
                checked={mode ? cP : checkProvident}
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
              value={mode ? hR : HACRate}
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
        {mode && (
          <>
            {!!month && (
              <Grid item xs={12} md={4}>
                <Button variant="contained" fullWidth onClick={copy}>
                  复制上月数据
                </Button>
              </Grid>
            )}
            {month !== 11 && (
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={nextMonth}
                >
                  下个月
                </Button>
              </Grid>
            )}

            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={this.handleMonthCal}
              >
                查看本月个税
              </Button>
            </Grid>
          </>
        )}
        {!mode && (
          <Grid item xs={12} md={4}>
            <Button variant="contained" fullWidth color="primary" type="submit">
              计算
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default withStyles(style)(CalYearTax);
