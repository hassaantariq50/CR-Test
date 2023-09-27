import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from "./reducers";

const persistConfig = {
  key: 'root',
  storage,
  whitelist:["selectedCustomer"]
}
 

const persistedReducer = persistReducer(persistConfig, rootReducer)

const thunkMiddleware = [thunk];

export const store = createStore(
  persistedReducer,
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(applyMiddleware(...thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__())
    : applyMiddleware(...thunkMiddleware)
);

export let persistor = persistStore(store);

