import React from 'react';
import { Container } from 'flux/utils';
import classNames from 'classnames';
import { MainLayoutStore } from '../../stores';
import style from './css/style.workspace';

const propTypes = {
  noTabBar: React.PropTypes.bool
};

const defaultProps = {
  noTabBar: false
};

class WorkSpace extends React.Component {

  constructor(props) {
    super(props);
    this.state = WorkSpace.calculateState();
  }

  static getStores() {
    return [MainLayoutStore];
  }

  static calculateState() {
    return MainLayoutStore.getState();
  }

  render() {
    const className = classNames(style.workspace, {
      [style.noTabBar]: this.props.noTabBar,
      [style.drawerOpen]: this.state.isDrawerOpen,
    }, this.props.className);

    return (
      <article className={className}>
        {this.props.children}
      </article>
    );
  }
}

WorkSpace.propTypes = propTypes;
WorkSpace.defaultProps = defaultProps;

module.exports = Container.create(WorkSpace, { pure: false, withProps: true });
