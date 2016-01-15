import React from 'react';

class AppHeader extends React.Component {

  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <button className="mdl-layout__drawer-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="select_module">
            <i className="material-icons">view_module</i>
          </button>
          <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-left" htmlFor="select_module">
            {this.props.children}
          </ul>
          <span className="mdl-layout-title">{this.props.title}</span>
        </div>
      </header>
    );
  }
}

module.exports = AppHeader;
