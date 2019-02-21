import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
  },
  grid: {
    textAlign: 'center'
  },
  divider: {
    marginTop: theme.spacing.unit
  },
  listItem: {
    padding: `${theme.spacing.unit}px 0 0 0`
  }
});

class Result extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const {
      classes,
      location: { state = {} }
    } = this.props;
    const { yearTax, yearIncome, yearDeduction, yearInsurance } = state;
    return (
      <main className={classes.root}>
        <Paper className={classes.paper}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.grid}
          >
            <Grid item>
              <Typography variant="caption" gutterBottom>
                年度个税(元)
              </Typography>
              <Typography variant="subtitle2" color="secondary">
                {yearTax}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                年度税前(元)
              </Typography>
              <Typography variant="subtitle2">{yearIncome}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                年度扣除总额(元)
              </Typography>
              <Typography variant="subtitle2">{yearDeduction}</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <List disablePadding>
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={
                  <Typography variant="caption">起征点(减除费用)</Typography>
                }
              />
              <Typography>60000</Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={
                  <Typography variant="caption">
                    五险一金(个人缴纳部分)
                  </Typography>
                }
              />
              <Typography>{yearInsurance}</Typography>
            </ListItem>
          </List>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(Result);
