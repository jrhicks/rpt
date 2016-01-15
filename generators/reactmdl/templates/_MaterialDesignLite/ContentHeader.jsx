import React from 'react';

class ContentHeader extends React.Component {

  render() {
    const black = { color: 'black' };

    return (
      <header className="mdl-layout__header mdl-layout__header--transparent mdl-layout--fixed-header">
        <div className="mdl-layout__header-row">
          <span style={black} className="mdl-layout-title">{this.props.title}</span>

          <div className="mdl-layout-spacer"></div>

          <nav className="mdl-navigation mdl-js-ripple-effect">
            {this.props.children}
          </nav>
          <button className="mdl-layout__drawer-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="select_module">
            <i style={black} className="material-icons">menu</i>
          </button>
        </div>
      </header>
    );
  }
}

module.exports = ContentHeader;
