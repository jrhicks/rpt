import AppDispatcher from '../dispatcher/AppDispatcher';

class MainLayoutActions {

  openDrawer() {
    const action = {
      type: 'MainLayout/openDrawer'
    };
    AppDispatcher.dispatch(action);
  }

  closeDrawer() {
    const action = {
      type: 'MainLayout/closeDrawer'
    };
    AppDispatcher.dispatch(action);
  }

  toggleDrawer() {
    const action = {
      type: 'MainLayout/toggleDrawer'
    };
    AppDispatcher.dispatch(action);
  }
}

module.exports = new MainLayoutActions();
