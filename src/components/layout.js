import React from 'react';
import Terminal from './Terminal/terminal.js';
import logo from '../logo.svg'

// import Header from './Header.jsx';
// import Footer from './Footer.jsx';

export default class Layout extends React.Component {
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
        { this.props.children }
      </div>
    );
  }
}