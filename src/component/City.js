import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import { Place } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { CITY, INSURANCE } from '../constant';
import { getInsurance } from '../utils/tax';
import normalizedNumber from '../utils/normalizedNumber';

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
});

class City extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    switchCity: PropTypes.func.isRequired,
    writeInput: PropTypes.func.isRequired,
    cityIdx: PropTypes.number.isRequired
  };

  handleClick = cityIdx => e => {
    const {
      switchCity,
      writeInput,
      history,
      monthIncome,
      checkProvident
    } = this.props;
    const { IBases, HACBases, HACRates } = INSURANCE[cityIdx];
    switchCity(cityIdx);
    const IBase = normalizedNumber(monthIncome, IBases);
    const HACBase = normalizedNumber(monthIncome, HACBases);
    const insurance = getInsurance(
      IBase,
      HACBase,
      cityIdx,
      checkProvident,
      HACRates[0]
    );
    writeInput({ HACRate: HACRates[0], insurance, IBase, HACBase });
    history.push('/');
  };

  render() {
    const { classes, cityIdx } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Typography className={classes.title}>热门城市</Typography>
            </Grid>
            {CITY.map((city, i) => (
              <Grid item key={i}>
                <Button
                  size="small"
                  color={i === cityIdx ? 'primary' : 'inherit'}
                  variant="contained"
                  onClick={this.handleClick(i)}
                >
                  {i === cityIdx && <Place />}
                  {city}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(City);
