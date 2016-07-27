import React from 'react';
import render from 'react-dom';
import { RouteHandler } from 'react-router';
import Terminal from './Terminal';
import logo from '../logo.svg'

// import Header from './Header.jsx';
// import Footer from './Footer.jsx';

export default React.createClass({

  /**
   * Renders the layout
   * @return {ReactElement}
   */
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <Terminal />
        {this.props.children}
      </div>
    );
  }
});