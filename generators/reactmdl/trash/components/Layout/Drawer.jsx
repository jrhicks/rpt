import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string,
    title: PropTypes.node
};

class Drawer extends React.Component {
    render() {
      let { className, title, children, ...otherProps } = this.props;

      const classes = classNames('mdl-layout__drawer', className);

      return (
          <div className={classes} {...otherProps}>
              {title ? <span className="mdl-layout-title">{title}</span> : null}
              {children}
          </div>
      );
    }
};

Drawer.propTypes = propTypes;

export default Drawer;
