import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    className: PropTypes.string
};

class Content extends React.Component {
  render() {
    let { children, className, ...otherProps } = this.props;

    const classes = classNames('mdl-layout__content', className);

    return (
        <div className={classes} {...otherProps}>
            {children}
            <div className="react-mdl-header-tabs-hack" id="undefined" />
        </div>
    );
  }
};

Content.propTypes = propTypes;

export default Content;
