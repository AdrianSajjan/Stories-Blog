import { combineReducers } from 'redux'
import user from './user'
import notify from './notify'
import request from './request'

export default combineReducers({ user, request, notify })
