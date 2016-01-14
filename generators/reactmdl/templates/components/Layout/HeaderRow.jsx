import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Spacer from './Spacer';

const propTypes = {
    className: PropTypes.string,
    title: PropTypes.node
};

class HeaderRow extends React.Component {
  render() {
    let { className, title, children, ...otherProps } = this.props;

    const classes = classNames('mdl-layout__header-row', className);

    return (
        <div className={classes} {...otherProps}>
            {title && <span className="mdl-layout-title">{title}</span>}
            <Spacer />
            {children}
        </div>
    );
  }
};
HeaderRow.propTypes = propTypes;

export default HeaderRow;
