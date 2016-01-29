import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import rootRoute from './index';
import stores from './stores';

require('file?name=[name].[ext]!./index.html');

ReactDOM.render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('app')
);
