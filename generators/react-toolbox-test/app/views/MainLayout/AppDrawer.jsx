import React from 'react';
import { Container } from 'flux/utils';
import { List, ListItem } from 'react-toolbox';
import classNames from 'classnames';
import { MainLayoutStore } from '../../stores';
import style from './css/style.app_drawer';

const propTypes = {
  noTabBar: React.PropTypes.bool
};

const defaultProps = {
  noTabBar: false
};

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = AppDrawer.calculateState();
  }

  static getStores() {
    return [MainLayoutStore];
  }

  static calculateState() {
    return MainLayoutStore.getState();
  }

  renderDrawerItems() {
    const className = style.item;

    return (
      <ListItem
        key={1}
        caption="Item 1"
        className={className}
        selectable
        to="/"
      />
    );
  }

  render() {
    const className = classNames(style.root, {
      [style.drawerOpen]: this.state.isDrawerOpen,
      [style.drawerClosed]: !this.state.isDrawerOpen,
      [style.noTabBar]: this.props.noTabBar
    }, this.props.className);

    return (
      <aside className={className}>
        <List className={style.list} selectable ripple>
          {this.renderDrawerItems()}
        </List>
        <footer className={style.footer}>
          <span>CTEH LLC © 2016</span>
        </footer>
      </aside>
    );
  }
}

AppDrawer.propTypes = propTypes;
AppDrawer.defaultProps = defaultProps;

module.exports = Container.create(AppDrawer, { pure: false, withProps: true });
