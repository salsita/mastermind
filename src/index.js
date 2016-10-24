import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { BOOTSTRAP } from './constants/actionTypes';
import buildAction from './helpers/buildAction';
import configureStore from './store';
import Index from './containers';

import './index.css';

const store = configureStore();
store.dispatch(buildAction(BOOTSTRAP));

render((
  <Provider store={store}>
    <Index />
  </Provider>
), document.getElementById('root'));
