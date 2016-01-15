import React from 'react';
import { Link } from 'react-router';

class Tab extends React.Component {

  render() {
    const tabStyle = {color: '#666'};

    return (
      <Link className="mdl-layout__tab" style={tabStyle} to={this.props.to}>{this.props.children}</Link>
    );
  }
}

module.exports = Tab;
