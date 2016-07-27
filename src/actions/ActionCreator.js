'use strict';

/**
 * Actions are initialized here for the application
 * @module ActionCreators
 */

import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * Firing out a new action to the dispatcher with the given type (@AppConstants)
 * and the given payload
 * @param {string} actionType=''
 * @param {*} [payload={}]
 */
export default function Action(actionType='', payload={}) {
  AppDispatcher.dispatch({
    type: actionType,
    payload: payload
  });
}
