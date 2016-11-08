import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import PrintDevices from './routes/PrintDevices';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Products} />
      <Route path="/products" component={Products}/>
      <Route path="/printDevices" component={PrintDevices}/>
    </Router>
  );
};
