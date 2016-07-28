import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

/**
 * @type {Map}
 * @private
 */
let _route = { location: { pathname: '/' } };

/**
 * Creating the store with ES6 class syntax. JSDoc doesn't support ES6 classes
 * yet. See: {@link https://github.com/jsdoc3/jsdoc/issues/819}
 * @class RouteStore
 */
class RouteStore extends EventEmitter {

  /**
   * Initialize the store by registering it to the Dispatcher
   * @constructs RouteStore
   */
  constructor() {
      super();
    /** @member RouteStore#_dispatchToken */
    this._dispatchToken = AppDispatcher.register(this._registerCallback.bind(this));
  }

  changeRoute(value) {
      _route = value;
      this.emit(AppConstants.ROUTE.CHANGED_EVENT);
  }

  /**
   * Registers a callback which will be called upon dispatch made
   * by the dispatcher
   * @param {Object} action
   * @member RouteStore#_registerCallback
   * @private
   */
  _registerCallback(event) {
    switch (event.type) {
      case AppConstants.ROUTE.CHANGE:
        this.changeRoute(event.payload);
        break;

      default:
        // do nothing
    }
  }

  /**
   * Gets the actual state (~route)
   * @member RouteStore#getRoute
   * @return {Map} _route
   */
  getRoute() {
    return _route;
  }

}

export default new RouteStore();
