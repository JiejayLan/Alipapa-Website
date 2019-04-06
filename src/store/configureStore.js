import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import applicationReducer from '../reducers/application';

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, authReducer)
// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
const persistConfig = {
  key: 'root',
  storage,
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
console.log("reductor")
const persistedReducer = persistReducer(persistConfig, authReducer)

export default () => {
  let store = createStore(
              combineReducers({
              application: applicationReducer,
              auth: persistedReducer
  }),
  composeEnhancers(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default () => {
//   const store = createStore(
//     combineReducers({
//       application: applicationReducer,
//       auth: authReducer
//     }),
//     composeEnhancers(applyMiddleware(thunk))
//   );
//   return store;
// };

