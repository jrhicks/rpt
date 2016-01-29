import React from 'react';
import { App } from 'react-toolbox';

class MainLayout extends React.Component {

  render() {
    return (
      <App>
        {this.props.children}
      </App>
    );
  }
}

module.exports = MainLayout;
