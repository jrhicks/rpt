import React from 'react';
import { IconButton } from 'react-toolbox';
import styles from './css/style.view';
import { MainLayoutActions } from '../../actions';

const propTypes = {
  title: React.PropTypes.string,
};

const defaultProps = {
};

class View extends React.Component {

  render() {
    return (
      <div className={styles.root}>
        <header className={styles.header} data-react-toolbox="app-bar">
          <IconButton
            className={styles.iconButton}
            icon="menu"
            onClick={MainLayoutActions.toggleDrawer}
            ripple
          />
          <h4>{ this.props.title }</h4>
        </header>
        {this.props.children}
      </div>
    );
  }
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

module.exports = View;
