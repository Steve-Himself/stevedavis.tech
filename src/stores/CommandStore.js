import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

/**
 * @type {Map}
 * @private
 */
let _commandHistory = [];
let _commandIndex = -1;
let _command = '';

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

  appendCommand(text) {
    _commandHistory = _commandHistory.push(text);
  }

  setCommand(text) {
    this._command = text;
    this.emit(AppConstants.COMMAND.CHANGED_EVENT);
  }

  /**
   * Registers a callback which will be called upon dispatch made
   * by the dispatcher
   * @param {Object} action
   * @member CommandStore#_registerCallback
   * @private
   */
  _registerCallback(event) {
    switch (event.type) {

      case AppConstants.COMMAND.CHANGED_EVENT:
        this.setCommand(event.payload.text);
        break;

      case AppConstants.COMMAND.SUBMIT_COMMAND:
        this.appendCommand(event.payload.text);
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
