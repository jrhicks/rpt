import React from 'react';

const defaultProps = { drawer: true };

class ContentHeader extends React.Component {

  renderDrawerButton() {
    const black = { color: 'black' };

    if (this.props.drawer) {
      return (
      <button className="mdl-layout__drawer-button mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="select_module">
          <i style={black} className="material-icons">menu</i>
      </button> )
    }
  }
  render() {
    const black = { color: 'black' };
    let headerClasses = [
      'mdl-layout',
      'mdl-layout__header',
      'mdl-layout__header--scroll',
      'mdl-layout__header--content',
      'mdl-layout__header--transparent'
    ];

    if (this.props.drawer === false) {
      headerClasses.push('mdl-layout__header--no_drawer');
    }

    return (
      <header className={ headerClasses.join(' ') } >
        <div className="mdl-layout__header-row">
          <span style={black} className="mdl-layout-title">{this.props.title}</span>
          {this.renderDrawerButton()}

          <div className="mdl-layout-spacer"></div>

          <nav className="mdl-navigation mdl-js-ripple-effect">
            {this.props.children}
          </nav>

        </div>
      </header>
    );
  }
}

ContentHeader.defaultProps = defaultProps;
module.exports = ContentHeader;
