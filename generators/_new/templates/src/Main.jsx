import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
require('file?name=[name].[ext]!./index.html');

const rootRoute = {
  component: 'div',
  childRoutes: [
    require('./views')
  ]
};

ReactDOM.render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app')
);
