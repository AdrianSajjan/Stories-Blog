import { TOGGLE_FORM_DIALOG, TOGGLE_SIDEBAR, TOGGLE_SUBSCRIBE_DIALOG } from '../constants'

export const toggleFormDialog = (value, toggle = false) => (dispatch) => {
  dispatch({ type: TOGGLE_FORM_DIALOG, value, toggle })
}

export const toggleSidebar = (value, toggle = false) => (dispatch) => {
  dispatch({ type: TOGGLE_SIDEBAR, value, toggle })
}

export const toggleSubscribeDialog = (value, toggle = false) => (dispatch) => {
  dispatch({ type: TOGGLE_SUBSCRIBE_DIALOG, value, toggle })
}
