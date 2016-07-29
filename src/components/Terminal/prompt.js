import React from 'react';
import browserHistory from 'react-router';
import CommandStore from '../../stores/CommandStore';
import RouteStore from '../../stores/RouteStore';
import AppConstants from '../../constants/AppConstants';
import config from '../../appConfig.js';

const _getState = () => (
  { 
    commandLine: CommandStore.getCurrentCommand(),
    route: RouteStore.getRoute(),
  });

export default class Prompt extends React.Component {
  constructor() {
    super();
    this.state = _getState();
  }

  componentDidMount() {
    CommandStore.on(AppConstants.COMMAND.CHANGED_EVENT, this._onChange.bind(this));
    RouteStore.on(AppConstants.ROUTE.CHANGED_EVENT, this._onChange.bind(this));
  }

  componentWillUnmount() {
    CommandStore.removeListener(AppConstants.COMMAND.CHANGED_EVENT, this._onChange.bind(this));
    RouteStore.removeListener(AppConstants.ROUTE.CHANGED_EVENT, this._onChange.bind(this));
  }

  _onChange() {
    this.setState(_getState());
  }

  render() {
    return 
  
  }
}