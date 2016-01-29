import AppDispatcher from '../dispatcher/AppDispatcher';
import { Store } from 'flux/utils';

class MainLayoutStore extends Store {

  constructor(props) {
    super(props);
    this.state = { isDrawerOpen: true };
  }

  getState() {
    return this.state;
  }

  __onDispatch(action) {
    switch (action.type) {
      case 'MainLayout/openDrawer':
        this.state = { isDrawerOpen: true };
        this.__emitChange();
        break;
      case 'MainLayout/closeDrawer':
        this.state = { isDrawerOpen: false };
        this.__emitChange();
        break;
      case 'MainLayout/toggleDrawer':
        console.log("toggle");
        this.state = { isDrawerOpen: !this.state.isDrawerOpen };
        this.__emitChange();
        break;
      default:
        console.log(`Action identifier: ${action.type} not handled.`);
        break;
    }
  }
}

module.exports = new MainLayoutStore(AppDispatcher);
