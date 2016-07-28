import React from 'react';
import ReactDom from 'react-dom';
import Output from './output';
import Prompt from './prompt';
import AppConstants from '../../constants/AppConstants';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import './terminal.style.css';
import CommandBroker from './commandBroker'

class Terminal extends React.Component {
  componentDidMount() {
    CommandBroker.appendCommandHandler({
      command: 'help',
      description: ['Shows help information.'],
      handle: function (args) {
        var handlers = CommandBroker.describe();
        setTimeout(function () {
          AppDispatcher.dispatch({ type: AppConstants.OUTPUT.APPEND, payload: { lines: handlers } });
        }, 0);
      }
    });

    CommandBroker.appendCommandHandler({
      command: 'version',
      description: ['Shows this software version.'],
      handle: function (args) {
        setTimeout(function () {
          AppDispatcher.dispatch({ type: AppConstants.OUTPUT.APPEND, payload: { lines: ['Version 0.1 Beta'] } });
        }, 0);
      }
    });

    AppDispatcher.dispatch({ type: AppConstants.COMMAND.PROCESS_COMMAND, payload: { text: 'help' } });
  }

  onclick(event) {
    this.refs.terminal.focus();
  }

  render() {
    return <div className="terminal">
      <div className='terminal-viewport' onClick={this.onclick}>
        <Output />
        <Prompt />
      </div>
    </div>
  }
}

export default Terminal;