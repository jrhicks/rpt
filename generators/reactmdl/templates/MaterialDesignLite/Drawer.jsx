import React from 'react';

class Drawer extends React.Component {

  render() {
    return (
      <div className="mdl-layout__drawer">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Drawer;
