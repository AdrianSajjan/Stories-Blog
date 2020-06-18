import { v4 as uuid_v4 } from 'uuid'
import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../constants'

export const enqueueSnackbar = (notification) => (dispatch) => {
  dispatch({
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: uuid_v4()
    }
  })
}

export const closeSnackbar = (key) => (dispatch) => {
  dispatch({
    type: CLOSE_SNACKBAR,
    dismissAll: !key,
    key
  })
}

export const removeSnackbar = (key) => (dispatch) => {
  dispatch({ type: REMOVE_SNACKBAR, key })
}
