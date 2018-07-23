import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/app';
import rootReducer from './reducers';


const store = createStore(rootReducer, applyMiddleware(thunk)); 
//const createStoreWithMiddleware = applyMiddleware()(createStore);
store.subscribe(() => console.log('we', store.getState()));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
