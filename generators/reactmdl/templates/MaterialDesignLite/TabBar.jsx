import React from 'react';

class TabBar extends React.Component {

  render() {
    const tabBarStyle = { backgroundColor: '#EEE' };

    return (
      <div style={tabBarStyle}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = TabBar;
