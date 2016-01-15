import React from 'react';
import { AppHeader, MenuItem } from './../MaterialDesignLite';

class StandardHeader extends React.Component {

  render() {
    return (
      <AppHeader title={this.props.title}>
        <MenuItem to="/abc">Workspace 1</MenuItem>
        <MenuItem to="/abc">Workspace 2</MenuItem>
        <MenuItem to="/abc">Workspace 3</MenuItem>
      </AppHeader>
    );
  }
}

module.exports = StandardHeader;
