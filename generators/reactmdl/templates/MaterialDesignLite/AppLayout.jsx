import React from 'react';

class Layout extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentWillUpdate() {
    window.componentHandler.upgradeDom();
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        {this.props.children}
      </div>
    );
  }
}

module.exports = Layout;
