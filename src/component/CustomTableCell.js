import { withStyles } from '@material-ui/core/styles';
import { TableCell } from '@material-ui/core';
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
export default CustomTableCell;
