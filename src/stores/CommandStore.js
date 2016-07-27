import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import COMMAND from '../constants/AppConstants';

/**
 * @type {Map}
 * @private
 */
let _commandHistory = [];
let _commandIndex = -1;
let _command = '';

function appendCommand(text) {
    _command = _command.push(text);

    AppDispatcher.dispatch({ type: COMMAND.CHANGED_EVENT, payload: {text: ''} });
}

function setCommand(text) {
  this._command = text;
}

/**
 * Creating the store with ES6 class syntax. JSDoc doesn't support ES6 classes
 * yet. See: {@link https://github.com/jsdoc3/jsdoc/issues/819}
 * @class CommandStore
 */
class CommandStore extends EventEmitter {

  /**
   * Initialize the store by registering it to the Dispatcher
   * @constructs CommandStore
   */
  constructor() {
    super();
    /** @member CommandStore#_dispatchToken */
    this._dispatchToken = AppDispatcher.register(this._registerCallback.bind(this));
  }

  /**
   * Registers a callback which will be called upon dispatch made
   * by the dispatcher
   * @param {Object} action
   * @member CommandStore#_registerCallback
   * @private
   */
  _registerCallback(payload) {
      var action = payload.action;
    switch (action.actionType) {

      case COMMAND.CHANGED_EVENT:
        setCommand(payload.action.text);
        break;

      case COMMAND.PROCESS_COMMAND:
        appendCommand(payload.action.text);
        break;

      default:
        // do nothing
    }
  }

  /**
   * Gets the actual state (~command)
   * @member CommandStore#getCommand
   * @return {Map} _command
   */
  getCurrentCommand() {
    return _command;
  }

}

export default new CommandStore();
