import React from 'react';
import OUTPUT from '../../constants/AppConstants';
import OutputStore from '../../stores/OutputStore';

const _getState = () => ({ output: OutputStore.getOutput() });

export default class Output extends React.Component {

  constructor() {
    super();
    this.state = _getState();
  }

  componentDidMount() {
    OutputStore.on(OUTPUT.CHANGED_EVENT, this._onChange.bind(this));
  }

  componentWillUnmount() {
    OutputStore.removeListener(OUTPUT.CHANGED_EVENT, this._onChange.bind(this));
  }

  _onChange() {
    this.setState(_getState());
  }

  render() {
    return <div className='terminal-results'>{ this.state.output }</div>
  }
}