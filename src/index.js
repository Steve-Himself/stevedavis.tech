import React from 'react';
import { render } from 'react-dom'
import { Router, hashHistory, Route, IndexRoute, DefaultRoute, Link } from 'react-router'
import config from './appConfig.js';
import { Layout, Home, About, Contact } from './components';
import './index.css';

/**
 * For the React Chrome addon
 */
window.React = React;

class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>Page Not Found.</h1>
        <p>Go to <Link to="/">Home Page</Link></p>
      </div>
    )
  }
}

/**
 * Rendering the app to the site's body. Using react-router here.
 */
render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout} >
      <IndexRoute component={Home} />
      <Route name="about" path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById("root"))