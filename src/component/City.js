import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import { Place } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { CITYS } from '../constant';

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
    classes: PropTypes.object.isRequired
  };

  handleClick = cityIdx => e => {
    this.props.switchCity(cityIdx);
    this.props.history.push('/');
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
            {CITYS.map((city, i) => (
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
