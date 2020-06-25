import { combineReducers } from 'redux'
import user from './user'
import notify from './notify'
import request from './request'
import posts from './post'
import misc from './misc'

export default combineReducers({ user, request, notify, posts, misc })
