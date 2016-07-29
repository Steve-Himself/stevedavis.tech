import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import config from '../appConfig.js';

/**
 * @type {Map}
 * @private
 */
let _output = config.terminal.initialOutput || [];

/**
 * Creating the store with ES6 class syntax. JSDoc doesn't support ES6 classes
 * yet. See: {@link https://github.com/jsdoc3/jsdoc/issues/819}
 * @class OutputStore
 */
class OutputStore extends EventEmitter {

  /**
   * Initialize the store by registering it to the Dispatcher
   * @constructs OutputStore
   */
  constructor() {
      super();
    /** @member OutputStore#_dispatchToken */
    this._dispatchToken = AppDispatcher.register(this._registerCallback.bind(this));
  }

  appendOutput(lines) {
      _output = _output.concat(lines);
      this.emit(AppConstants.OUTPUT.CHANGED_EVENT);
  }

  /**
   * Registers a callback which will be called upon dispatch made
   * by the dispatcher
   * @param {Object} action
   * @member OutputStore#_registerCallback
   * @private
   */
  _registerCallback(event) {
    switch (event.type) {

      case AppConstants.OUTPUT.APPEND:
        this.appendOutput(event.payload.lines);
        break;

      default:
        // do nothing
    }
  }

  /**
   * Gets the actual state (~output)
   * @member OutputStore#getOutput
   * @return {Map} _output
   */
  getOutput() {
    return _output;
  }

}

export default new OutputStore();
