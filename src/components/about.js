import React from 'react';
import { Link } from 'react-router';

export default class About extends React.Component {

  /**
   * Renders the about screen.
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <div>
          <Link to="home">Home</Link>
        </div>
      </div>
    );
  }

}
