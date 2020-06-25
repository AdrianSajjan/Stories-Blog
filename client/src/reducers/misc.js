import { TOGGLE_FORM_DIALOG, TOGGLE_SIDEBAR, TOGGLE_SUBSCRIBE_DIALOG } from '../constants'

const initialState = {
  sidebarOpen: false,
  formDialogOpen: false,
  subscribeDialogOpen: false
}

export default function (state = initialState, action) {
  const { type, value, toggle } = action

  switch (type) {
    case TOGGLE_FORM_DIALOG:
      return {
        ...state,
        formDialogOpen: toggle ? value : !state.formDialogOpen
      }

    case TOGGLE_SUBSCRIBE_DIALOG:
      return {
        ...state,
        subscribeDialogOpen: toggle ? value : !state.subscribeDialogOpen
      }

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: toggle ? value : !state.sidebarOpen
      }

    default:
      return state
  }
}
