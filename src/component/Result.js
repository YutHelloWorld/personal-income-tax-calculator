import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import orange from '@material-ui/core/colors/orange';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: theme.spacing.unit * 6
    }
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: 0,
    left: 0,
    margin: '0 auto',
    opacity: 0.8
  },
  fabContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 56
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    }
  },
  grid: {
    textAlign: 'center'
  },
  divider: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  fomular: {
    color: orange[800],
    background: orange[100],
    textIndent: -theme.spacing.unit * 8,
    paddingLeft: theme.spacing.unit * 9
  },
  detail: {
    marginBottom: theme.spacing.unit * 2
  },
  tableRow: {
    height: theme.spacing.unit * 5,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
});
let id = 0;
function createData(minIncome, maxIncome, taxRate, deduction) {
  id += 1;
  let income;
  if (!minIncome) {
    income = `超过${maxIncome},0000的部分`;
  } else if (!maxIncome) {
    income = `不超过${minIncome},000的部分`;
  } else {
    income = `超过${minIncome},000至${maxIncome},000的部分`;
  }
  return { id, income, taxRate, deduction };
}

const rows = [
  createData(36, 0, 3, 0),
  createData(36, 144, 10, 2520),
  createData(144, 300, 20, 16920),
  createData(300, 420, 25, 31920),
  createData(420, 660, 30, 52920),
  createData(660, 960, 35, 85920),
  createData(0, 960, 45, 181920)
];

const rows2 = [
  createData(3, 0, 3, 0),
  createData(3, 12, 10, 210),
  createData(12, 25, 20, 1410),
  createData(25, 35, 25, 2660),
  createData(35, 55, 30, 4410),
  createData(55, 80, 35, 7160),
  createData(0, 80, 45, 15160)
];

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 12,
    textAlign: 'center'
  }
}))(TableCell);

class Result extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  handleClick = () => {
    this.props.history.push('/');
  };
  render() {
    const {
      classes,
      location: { state = {} }
    } = this.props;
    const data = state.yearDeduction ? rows : rows2;
    return (
      <main className={classes.root}>
        <div className={classes.fabContainer}>
          <Fab
            color="primary"
            className={classes.fab}
            onClick={this.handleClick}
          >
            <Icon>home</Icon>
          </Fab>
        </div>
        <Paper className={classes.paper} elevation={2}>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.grid}
          >
            <Grid item>
              <Typography variant="caption" gutterBottom>
                {state.yearDeduction ? '年度税前(元)' : '税前收入(元)'}
              </Typography>
              <Typography variant="subtitle2">{state.income}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                {state.yearDeduction ? '年度个税(元)' : '应纳个税(元)'}
              </Typography>
              <Typography variant="subtitle2" color="secondary">
                {state.tax}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                {state.yearDeduction ? '年度税后(元)' : '税后收入(元)'}
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {state.afterTax}
              </Typography>
            </Grid>
          </Grid>
          {state.yearDeduction && <Divider className={classes.divider} />}
          {state.yearDeduction && (
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
                <Typography>{state.yearInsurance}</Typography>
              </ListItem>
            </List>
          )}
        </Paper>
        <Typography variant="button" className={classes.detail}>
          计算详情
        </Typography>
        <Typography className={classes.fomular} variant="overline">
          {state.yearDeduction
            ? '年度个税 = （累计税前 - 累计五险一金 - 累计专项附加扣除 - 累计减除费用）× 税率 - 速算扣除数'
            : '个税 = 税前 x 税率 - 速算扣除数'}
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="caption">
                  {state.yearDeduction
                    ? '(累计税前-累计五险一金-累计专项扣除-累计减除费用)'
                    : '税前'}
                </Typography>
              }
            />
            <Typography>
              {state.yearDeduction
                ? (state.income - state.yearDeduction).toFixed(2)
                : state.income}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography variant="caption">税率</Typography>}
            />
            <Typography>{`×${state.taxRate}%`}</Typography>
          </ListItem>
          <ListItem divider>
            <ListItemText
              primary={<Typography variant="caption">速算扣除数</Typography>}
            />
            <Typography>-{state.quickDeduction}</Typography>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={<Typography variant="caption">个税</Typography>}
            />
            <Typography>{state.tax}</Typography>
          </ListItem>
        </List>
        <Typography variant="button" className={classes.detail}>
          {state.yearDeduction
            ? '年度个人所得税税率表'
            : '年终奖个人所得税率表'}
          {!state.yearDeduction && (
            <Typography variant="caption" inline>
              （* 年终奖/12获得税率和速算数）
            </Typography>
          )}
        </Typography>

        <Table padding="none">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <CustomTableCell>级数</CustomTableCell>
              <CustomTableCell>应纳税所得额</CustomTableCell>
              <CustomTableCell>税率(%)</CustomTableCell>
              <CustomTableCell>速算扣除数</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.id} className={classes.tableRow}>
                <CustomTableCell>{row.id}</CustomTableCell>
                <CustomTableCell>{row.income}</CustomTableCell>
                <CustomTableCell>{row.taxRate}</CustomTableCell>
                <CustomTableCell>{row.deduction}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!state.yearDeduction && (
          <Typography variant="caption" className={classes.divider}>
            年终奖所得，将年终奖金额除以12个月，以每月平均收入金额来确定税率和速算扣除数
          </Typography>
        )}
      </main>
    );
  }
}

export default withStyles(styles)(Result);
