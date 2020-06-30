import React from 'react'
import { People, Mail, Search, NewReleases } from '@material-ui/icons'

export const sidebarCategories = [
  {
    name: 'Users',
    children: [
      { name: 'Authors', icon: <People fontSize="small" />, route: '/dashboard/authors' },
      { name: 'Pending Requests', icon: <NewReleases fontSize="small" />, route: '/dashboard/pending-requests' },
      { name: 'Mailbox', icon: <Mail fontSize="small" />, route: '/dashboard/mailbox' },
      { name: 'Search Users', icon: <Search fontSize="small" />, route: '/dashboard/users/search' }
    ]
  }
]
