import React from 'react';
import { Link } from 'react-router';
import config from '../appConfig.js';

export default class Contact extends React.Component {

  /**
   * Renders the contact screen.
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <div>
          <Link to="home">Home</Link>
        </div>
        <div>
          You can find me on <a href={config.github}>github</a>.
        </div>
      </div>
    );
  }

}
