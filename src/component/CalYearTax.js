import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import Typography from '@material-ui/core/Typography';

const style = theme => ({
  button: {
    // marginTop: theme.spacing.unit * 3,
  },
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
    btnDisabled: true,
    monthIncome: '',
    insuranceBase: '',
    minInsuranceBase: 3054.95,
    maxInsuranceBase: 15274.74,
    providentFundBase: '',
    minProvidentFundBase: 2010,
    maxProvidentFundBase: 24311
  };

  nomarlizeNumber(value, min, max) {
    const _value = +value;
    return _value >= min ? (_value <= max ? _value : max) : min;
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
    if (name === 'monthIncome') {
      this.setState({ btnDisabled: !value });
      this.setState(
        ({
          minInsuranceBase,
          maxInsuranceBase,
          minProvidentFundBase,
          maxProvidentFundBase
        }) => ({
          insuranceBase: this.nomarlizeNumber(
            value,
            minInsuranceBase,
            maxInsuranceBase
          ),
          providentFundBase: this.nomarlizeNumber(
            value,
            minProvidentFundBase,
            maxProvidentFundBase
          )
        })
      );
    }
  };

  render() {
    const { classes } = this.props;
    const {
      btnDisabled,
      monthIncome,
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
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="providentFundBase"
              label="公积金缴纳基数(元)"
              value={providentFundBase}
              onChange={this.handleChange('providentFundBase')}
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
          {/* <Grid item xs={12}> */}
          {/* <Grid container spacing={24} justify="flex-end" alignItems="flex-start"> */}
          <Grid item xs={12} md={3}>
            <Button
              disabled={btnDisabled}
              variant="contained"
              fullWidth
              color="primary"
            >
              计算
            </Button>
          </Grid>
          {/* </Grid> */}
          {/* </Grid> */}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(CalYearTax);
