import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { root } from './reducers'

const initialState = {}

const middlewares = []

export const store = createStore(
  initialState,
  root,
  composeWithDevTools(applyMiddleware(...middlewares))
)
