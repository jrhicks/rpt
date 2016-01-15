import React, { PropTypes } from 'react';
import classNames from 'classnames';
import mdlUpgrade from '../utils/mdlUpgrade';

const propTypes = {
    className: PropTypes.string,
    fixedDrawer: PropTypes.bool,
    fixedHeader: PropTypes.bool,
    fixedTabs: PropTypes.bool
}

class Layout extends React.Component {
    render() {
        let { className, fixedDrawer, fixedHeader, fixedTabs, ...otherProps } = this.props;

        const classes = classNames('mdl-layout mdl-js-layout', {
            'mdl-layout--fixed-drawer': fixedDrawer,
            'mdl-layout--fixed-header': fixedHeader,
            'mdl-layout--fixed-tabs': fixedTabs
        }, className);

        return (
            <div className={classes} {...otherProps}>
                {this.props.children}
            </div>
        );
    }
}

Layout.propTypes = propTypes;

export default mdlUpgrade(Layout);
