import React, { PropTypes } from 'react';
import classNames from 'classnames';
import HeaderRow from './HeaderRow';
import HeaderTabs from './HeaderTabs';

const propTypes = {
    className: PropTypes.string,
    scroll: PropTypes.bool,
    seamed: PropTypes.bool,
    title: PropTypes.node,
    transparent: PropTypes.bool,
    waterfall: PropTypes.bool
};

class Header extends React.Component {
    render() {
      let { className, scroll, seamed, title, transparent,
              waterfall, children, ...otherProps } = this.props;

      const classes = classNames('mdl-layout__header', {
          'mdl-layout__header--scroll': scroll,
          'mdl-layout__header--seamed': seamed,
          'mdl-layout__header--transparent': transparent,
          'mdl-layout__header--waterfall': waterfall
      }, className);

      let isRowOrTab = false;
      React.Children.forEach(children, child => {
          if(child && (child.type === HeaderRow || child.type === HeaderTabs)) {
              isRowOrTab = true;
          }
      });

      return (
          <header className={classes} {...otherProps}>
              {isRowOrTab ? children : (
                  <HeaderRow title={title}>{children}</HeaderRow>
              )}
          </header>
      );
    }
};

Header.propTypes = propTypes;

export default Header;
