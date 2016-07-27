import React from 'react';
import { browserHistory } from 'react-router';
import CommandStore from '../../stores/CommandStore';
import COMMAND from '../../constants/AppConstants';
import config from '../../appConfig.js';

const _getState = () => ({ commandLine: CommandStore.getCurrentCommand() });

export default class Prompt extends React.Component {
  constructor() {
    super();
    this.state = _getState();
  }

  componentDidMount() {
    CommandStore.on(COMMAND.CHANGED_EVENT, this._onChange.bind(this));
    browserHistory.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    CommandStore.removeListener(COMMAND.CHANGED_EVENT, this._onChange.bind(this));
  }

  _onChange() {
    this.setState(_getState());
  }


  render() {
    return <div>
      <span className='terminal-input'>{config.terminal.user + config.terminal.userPathSeparator + 'PATH' + config.terminal.promptEnd} {this.state.commandLine}</span>
      <span className='terminal-cursor'>&nbsp;</span>
      <input type='text' className='terminal-target' />
    </div>
  
  }
}