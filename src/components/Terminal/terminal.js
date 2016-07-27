import React from 'react';
import Output from './output';
import Prompt from './prompt';
import './terminal.style.css';

class Terminal extends React.Component {

  render() {
    return <div className="terminal">
        <div className='terminal-viewport'> 
            <Output />
            <Prompt />
        </div>
    </div>
  }
}

export default Terminal;