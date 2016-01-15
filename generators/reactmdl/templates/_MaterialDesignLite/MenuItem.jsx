import React from 'react';
import { Link } from 'react-router';

class MenuItem extends React.Component {

  render() {
    return (
      <li className="mdl-menu__item">
        <Link to={this.props.to}>{this.props.children}</Link>
      </li>
    );
  }
}

module.exports = MenuItem;
