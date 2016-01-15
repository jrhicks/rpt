import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    cssPrefix: PropTypes.string,
    onTabClick: PropTypes.func,
    style: PropTypes.object,
    tabId: PropTypes.number
};

const defaultProps = {
  style: {}
};

class Tab extends React.Component {

    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.props.onTabClick(this.props.tabId);
    }

    render() {
        const { active, className, cssPrefix, tabId,
            onTabClick, style, ...otherProps } = this.props;

        const classes = classNames({
            [`${cssPrefix}__tab`]: true,
            'is-active': active
        }, className);

        style.cursor = 'pointer';

        return <a className={classes} onClick={this._handleClick} style={style} {...otherProps}>{this.props.children}</a>;
    }
}

Tab.propTypes = propTypes;
Tab.defaultProps = defaultProps;

export default Tab;
