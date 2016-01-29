import React from 'react';
import 'react-toolbox/lib/commons';
import { MainLayout, AppDrawer, AppBar,
         WorkSpace, TabBar, View } from '../MainLayout';
import loremIpsum from 'lorem-ipsum';


class Dashboard extends React.Component {

  render() {
    return (
      <MainLayout>
        <AppBar title="Project Name Here" />
        <TabBar />
        <AppDrawer />
        <WorkSpace >
          <View title="List Current">
            <p>{loremIpsum({ count: 100 })}</p>
            <p>{loremIpsum({ count: 100 })}</p>
            <p>{loremIpsum({ count: 100 })}</p>
            <p>{loremIpsum({ count: 100 })}</p>
          </View>
        </WorkSpace>
      </MainLayout>
    );
  }
}

module.exports = Dashboard;
