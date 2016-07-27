import React from 'react';
import { Link } from 'react-router';

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }
  /**
   * Renders the about screen.
   * @return {ReactElement}
   */
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
      </div>
    );
  }

}
