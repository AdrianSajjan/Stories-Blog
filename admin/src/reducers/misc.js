import { TOGGLE_SIDEBAR } from '../constants'

const initialState = {
  mobileSidebarOpen: false
}

export default (state = initialState, action) => {
  const { type, value, toggle } = action

  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        mobileSidebarOpen: toggle ? !state.mobileSidebarOpen : value
      }

    default:
      return state
  }
}
