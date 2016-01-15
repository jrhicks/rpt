import React from 'react';

class DrawerGroup extends React.Component {

  render() {
    const pushDown = { marginTop: '36px' };
    return (
      <div>
        <span className="mdl-layout__drawer-title">{this.props.title}</span>
        <nav className="mdl-navigation" style={pushDown}>
          {this.props.children}
        </nav>
      </div>
    );
  }
}

module.exports = DrawerGroup;
