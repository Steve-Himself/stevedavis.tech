import React from 'react';
import ReactDOM from 'react-dom';
import keydown, { keydownScoped, Keys } from 'react-keydown';

import AppConstants from '../../constants/AppConstants';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import CommandBroker from './commandBroker'
import RouteStore from '../../stores/RouteStore';
import OutputStore from '../../stores/OutputStore';
import config from '../../appConfig.js';

import './terminal.style.css';

const _getState = () => (
  {
    route: RouteStore.getRoute(),
    output: OutputStore.getOutput()
  });

var _commandHistory = [];
var _commandIndex = -1;
var _commandLine = '';
var showPrompt = true;
var allowTypingWriteDisplaying = true;

@keydown
class Terminal extends React.Component {
  constructor() {
    super();
    this.state = _getState();
    //this.handleConsoleViewClick = this.handleConsoleViewClick.bind(this);
    // this.previousCommand = this.previousCommand.bind(this);
    // this.nextCommand = this.nextCommand.bind(this);
    // this.backspace = this.backspace.bind(this);
    // this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    RouteStore.on(AppConstants.ROUTE.CHANGED_EVENT, this._onChange.bind(this));
    OutputStore.on(AppConstants.OUTPUT.CHANGED_EVENT, this._onChange.bind(this));

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

    _commandLine = 'help';
    this.execute();
  }

  componentWillUnmount() {
    OutputStore.removeListener(AppConstants.OUTPUT.CHANGED_EVENT, this._onChange.bind(this));
    RouteStore.removeListener(AppConstants.ROUTE.CHANGED_EVENT, this._onChange.bind(this));
  }

  _onChange() {
    this.setState(_getState());
  }

  prompt() {
    return config.terminal.user + this.state.route.location.pathname + config.terminal.promptEnd;
  }

  execute() {
    _commandHistory.push(_commandLine);
    AppDispatcher.dispatch({ type: AppConstants.OUTPUT.APPEND, payload: { lines: [this.prompt() + ' ' + _commandLine] } });
    AppDispatcher.dispatch({ type: AppConstants.COMMAND.PROCESS_COMMAND, payload: { text: _commandLine } });
    _commandLine = '';
  }

  @keydownScoped('up')
  previousCommand() {
    if (_commandIndex == -1) {
      _commandIndex = _commandHistory.length;
    }

    if (_commandIndex == 0)
      return;

    _commandLine = _commandHistory[--_commandIndex];
  }

  @keydownScoped('down')
  nextCommand() {
    if (_commandIndex == -1) {
      return;
    }

    if (_commandIndex < _commandHistory.length - 1) {
      _commandLine = _commandHistory[++_commandIndex];
    }
    else {
      _commandLine = '';
    }
  }

  @keydownScoped('backspace')
  backspace() {
    if (_commandLine) {
      _commandLine = _commandLine.substring(0, _commandLine.length - 1);
    }
  }

  componentWillReceiveProps({ keydown }) {
    if (keydown.event) {
      // inspect the keydown event and decide what to do
      console.log(keydown.event.key);
      var key = keydown.event.key;
      if (showPrompt || allowTypingWriteDisplaying)
        if (_commandLine.length < 80) {
          _commandIndex = -1;
          _commandLine += key;
        }
    }
  }
  // @keydown
  // handleKeypress(e) {
  //   var key = e.key;
  //   if (showPrompt || allowTypingWriteDisplaying)
  //     if (_commandLine.length < 80) {
  //       _commandIndex = -1;
  //       _commandLine += key;
  //     }
  //   e.preventDefault();
  // }

  // handleKeydown(e) {
  //   console.log(e.keyCode);
  //   if (e.keyCode == 9) {
  //     e.preventDefault();
  //   }
  //   if (e.keyCode == 8) {
  //     if (showPrompt || allowTypingWriteDisplaying)
  //       this.backspace();
  //     e.preventDefault();
  //   }
  //   else if (e.keyCode == 13) {
  //     if (showPrompt || allowTypingWriteDisplaying)
  //       this.execute();
  //   }
  //   else if (e.keyCode == 38) {
  //     if (showPrompt || allowTypingWriteDisplaying)
  //       this.previousCommand();
  //     e.preventDefault();
  //   }
  //   else if (e.keyCode == 40) {
  //     if (showPrompt || allowTypingWriteDisplaying)
  //       this.nextCommand();
  //     e.preventDefault();
  //   }
  // }

  render() {
    var lines = this.state.output.map(function (line) {
      return <pre className="terminal-line">{line}</pre>
    })
    return <div className="terminal active" ref={(ref) => this.terminal = ref}>
      <div className='terminal-viewport'>
        <div className='terminal-results'>{lines}</div>
        <span className='terminal-input'>{ this.prompt() } { _commandLine }</span>
        <span className='terminal-cursor'>&nbsp; </span>
        <input type='text' className='terminal-target' />
      </div>
    </div>
  }
}

export default Terminal;