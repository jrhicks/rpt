import React from 'react';
import { Link } from 'react-router';

class DrawerLink extends React.Component {

  render() {
    return (
      <Link to={this.props.to} className="mdl-navigation__link">{this.props.children}</Link>
    );
  }
}

module.exports = DrawerLink;
