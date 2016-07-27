import React from 'react';
import Output from './output';
import Prompt from './prompt';
import CommandStore from '../../stores/CommandStore';
import COMMAND from '../../constants/AppConstants';
import './terminal.style.css';

const _getState = () => ({ commandLine: CommandStore.getCurrentCommand() });

export default class Terminal extends React.Component {
  constructor() {
    super();
    this.state = _getState();
  }

  componentDidMount() {
    CommandStore.on(COMMAND.CHANGED_EVENT, this._onChange.bind(this));
  }

  componentWillUnmount() {
    CommandStore.removeListener(COMMAND.CHANGED_EVENT, this._onChange.bind(this));
  }

  _onChange() {
    this.setState(_getState());
  }
 
  render() {
    return <div className="terminal">
        <div className='terminal-viewport'> 
            <Output />
            <span className='terminal-input'>{this.state.commandLine}</span>
            <span className='terminal-cursor'>&nbsp;</span>
            <Prompt />
        </div>
    </div>
  }
}
