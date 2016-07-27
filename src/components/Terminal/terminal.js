import React from 'react'
import Output from './output'
import Prompt from './prompt'
import './terminal.style.css'
import CommandStore from '../../stores'
import { COMMAND } from '../../constants/AppConstants'

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
    return <div class="terminal">
        <div class='terminal-viewport'> 
            <Output />
            <span class='terminal-input'>{this.state.commandLine}</span>
            <span class='terminal-cursor'>&nbsp;</span>
            <Prompt />
        </div>
    </div>
  }
}
