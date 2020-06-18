import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { root } from './reducers'
import thunk from 'redux-thunk'

const middlewares = [thunk]

export const store = createStore(root, composeWithDevTools(applyMiddleware(...middlewares)))
