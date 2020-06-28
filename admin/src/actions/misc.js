import { TOGGLE_SIDEBAR } from '../constants'

export const toggleSidebar = (value, toggle = false) => ({
  type: TOGGLE_SIDEBAR,
  value,
  toggle
})
