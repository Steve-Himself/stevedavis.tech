import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import OUTPUT from '../constants/AppConstants';

/**
 * @type {Map}
 * @private
 */
let _output = [];

function appendOutput(text) {
    _output = _output.push(text);
    this.emit(OUTPUT.OUTPUT_CHANGED_EVENT);
}

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

  /**
   * Registers a callback which will be called upon dispatch made
   * by the dispatcher
   * @param {Object} action
   * @member OutputStore#_registerCallback
   * @private
   */
  _registerCallback(payload) {
      var action = payload.action;
    switch (action.actionType) {

      case OUTPUT.APPEND:
        appendOutput(payload.action.text);
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
