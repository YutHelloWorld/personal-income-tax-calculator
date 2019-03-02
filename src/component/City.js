import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

  handleClick = idx => e => {
    this.props.history.push({
      pathname: '/',
      state: {
        idx
      }
    });
  };

  render() {
    const { classes, idx } = this.props;
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
                  color={i === idx ? 'primary' : 'inherit'}
                  variant="contained"
                  onClick={this.handleClick(i)}
                >
                  {i === idx && <Icon>place</Icon>}
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
