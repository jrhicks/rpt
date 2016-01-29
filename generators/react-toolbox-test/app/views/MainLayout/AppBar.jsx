import React from 'react';
import classNames from 'classnames';
import { MenuItem, MenuDivider } from 'react-toolbox';
import IconMenu from './IconMenu';
import style from './css/style.app_bar';

const propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool,
  flat: React.PropTypes.bool
};

const defaultProps = {
  className: '',
  title: 'Application Title',
  fixed: false,
  flat: false
};

class AppBar extends React.Component {

  render() {
    const className = classNames(style.root, {
      [style.fixed]: this.props.fixed,
      [style.flat]: this.props.flat
    }, this.props.className);

    return (
      <header className={className} data-react-toolbox="app-bar">
        <IconMenu icon="menu">
          <MenuItem value="download" icon="get_app" caption="Download" />
          <MenuItem value="help" icon="favorite" caption="Favorite" />
          <MenuItem value="settings" icon="open_in_browser" caption="Open in app" />
          <MenuDivider />
          <MenuItem value="signout" icon="delete" caption="Delete" disabled />
        </IconMenu>
        {this.props.title}
      </header>
    );
  }
}

AppBar.propTypes = propTypes;
AppBar.defaultProps = defaultProps;

export default AppBar;
