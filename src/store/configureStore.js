import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import applicationReducer from '../reducers/application';
import SUmanagementReducer from '../reducers/SUmanagement';
import tabooReducer from '../reducers/taboo';
//make the redux data persist
const persistConfig = {
  key: 'root',
  storage
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const authPersistedReducer = persistReducer(persistConfig, authReducer);
const tabooPersistedReducer = persistReducer(persistConfig, tabooReducer);

export default () => {
  let store = createStore(
    combineReducers({
      application: applicationReducer,
      auth: authPersistedReducer ,
      SUmanagement: SUmanagementReducer,
      taboo:tabooPersistedReducer
    }),
    composeEnhancers(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}

