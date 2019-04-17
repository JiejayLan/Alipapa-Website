import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './styles/bootstrap.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { PersistGate } from 'redux-persist/integration/react'
const { store, persistor } = configureStore();

const jsx = (
  <Provider store={store}>
  <PersistGate persistor={persistor}>
    <AppRouter/>
    </PersistGate>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(jsx, document.getElementById('app'));


