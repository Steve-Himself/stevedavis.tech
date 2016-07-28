import React from 'react';
import { Link } from 'react-router';
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
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Terminal />
        { this.props.children }
      </div>
    );
  }
}