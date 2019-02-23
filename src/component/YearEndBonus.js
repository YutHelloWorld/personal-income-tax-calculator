import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { getBonusTax } from '../utils/tax';

const style = theme => ({});

const aModeText = {
  forward: '应发年终奖(元)',
  reverse: '税后所得(元)'
};

class YearEndBonus extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    mode: 'forward',
    bonus: ''
  };

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleClick = e => {
    const { bonus, mode } = this.state;
    if (bonus) {
      e.preventDefault();
      this.props.history.push({
        pathname: '/result',
        state: { result: getBonusTax(+bonus, mode === 'forward'), type: 2 }
      });
    }
  };

  render() {
    const { mode, bonus } = this.state;
    return (
      <Grid container spacing={24} component="form" justify="flex-end">
        <Grid item xs={12}>
          <RadioGroup
            name="mode"
            value={this.state.mode}
            onChange={this.handleChange('mode')}
            row
          >
            <FormControlLabel
              value="forward"
              control={<Radio />}
              label="正算税后"
            />
            <FormControlLabel
              value="reverse"
              control={<Radio />}
              label="反推税前"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="bonus"
            label={aModeText[mode]}
            fullWidth
            type="number"
            value={bonus}
            onChange={this.handleChange('bonus')}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            onClick={this.handleClick}
          >
            计算
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(withStyles(style)(YearEndBonus));
