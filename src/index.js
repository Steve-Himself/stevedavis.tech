import Layout from './components/layout.js';
import Home from './components/home.js';
import About from './components/about.js';
import Contact from './components/contact.js';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, Route, IndexRoute, DefaultRoute, Link } from 'react-router';
import AppDispatcher from './dispatcher/AppDispatcher';
import AppConstants from './constants/AppConstants'
import config from './appConfig.js';
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
  <Router history={ browserHistory } onUpdate={
    function () {
      AppDispatcher.dispatch({ type: AppConstants.ROUTE.CHANGE, payload: this.state });
    }
  }>
    <Route path={config.baseUrl} component={ Layout } >
      <Route name="home" component={ Home } />
      <Route name="about" path="about" component={ About } />
      <Route name="contact" path="contact" component={ Contact } />
    </Route>
    <Route path="*" component={ PageNotFound } />
  </Router>
), document.getElementById("root"))