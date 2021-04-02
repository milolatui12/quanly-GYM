import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

//sagaMiddleWare.run(rootSaga);

export default store;