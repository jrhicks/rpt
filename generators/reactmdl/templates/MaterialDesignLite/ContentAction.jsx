import React from 'react';
import { Link } from 'react-router';

class ContentAction extends React.Component {

  render() {
    const actionsStyle = { color: 'black', textDecoration: 'underline' };
    return (
      <Link to={this.props.to} style={actionsStyle} className="mdl-navigation__link">
        {this.props.children}
      </Link>
    );
  }
}

module.exports = ContentAction;
