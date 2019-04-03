import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import applicationReducer from '../reducers/application';
<<<<<<< HEAD
=======

>>>>>>> 9807621bd029a2bbc54fa5531729615125950392
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      application: applicationReducer,
<<<<<<< HEAD
      auth: authReducer,
=======
      auth: authReducer
>>>>>>> 9807621bd029a2bbc54fa5531729615125950392
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

