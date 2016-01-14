import React, { PropTypes } from 'react';
import classNames from 'classnames';
import cloneChildren from '../utils/cloneChildren';
import Spacer from './Spacer';

const propTypes = {
    className: PropTypes.string
};


class Navigation extends React.Component {
  
    const { className, children, ...otherProps } = props;

    const classes = classNames('mdl-navigation', className);

    return (
        <nav className={classes} {...otherProps}>
            {cloneChildren(children, (child) => ({
                className: classNames({ 'mdl-navigation__link': child.type !== Spacer }, child.props.className)
            }))}
        </nav>
    );
};


export default Navigation;
