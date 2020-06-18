import { combineReducers } from 'redux'
import user from './user'
import notify from './notify'

export default combineReducers({ user, notify })
