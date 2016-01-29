import React from 'react';
import { IconButton, Menu } from 'react-toolbox';
import style from './css/style.icon_menu';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  icon: React.PropTypes.string,
  iconRipple: React.PropTypes.bool,
  menuRipple: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  onHide: React.PropTypes.func,
  onSelect: React.PropTypes.func,
  onShow: React.PropTypes.func,
  position: React.PropTypes.string,
  selectable: React.PropTypes.bool,
  selected: React.PropTypes.any
};

const defaultProps = {
  className: '',
  icon: 'more_vert',
  iconRipple: true,
  menuRipple: true,
  position: 'auto',
  selectable: false
};

class IconMenu extends React.Component {

  handleButtonClick = () => {
    this.refs.menu.show();
    if (this.props.onClick) this.props.onClick();
  };

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className}>
        <IconButton
          className={style.icon}
          icon={this.props.icon}
          onClick={this.handleButtonClick}
          ripple={this.props.iconRipple}
          inverse={true}
        />
        <Menu
          ref='menu'
          onHide={this.props.onHide}
          onSelect={this.props.onSelect}
          onShow={this.props.onShow}
          position={this.props.position}
          ripple={this.props.menuRipple}
          selectable={this.props.selectable}
          selected={this.props.selected}
        >
          {this.props.children}
        </Menu>
      </div>
    );
  }
}

IconMenu.propTypes = propTypes;
IconMenu.defaultProps = defaultProps;

module.exports = IconMenu;
