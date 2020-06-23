import {
  GET_CATEGORY_POSTS,
  SET_CATEGORY_POSTS,
  GET_CURRENT_POST,
  SET_CURRENT_POST,
  GET_AUTHOR_POSTS,
  SET_AUTHOR_POSTS,
  GET_SELF_POSTS,
  SET_SELF_POSTS
} from '../constants'

const initialState = {
  all: {
    posts: []
  },
  self: {
    posts: [],
    loading: false
  },
  current: {
    post: null,
    loading: false
  },
  recent: {
    posts: [],
    loading: false
  },
  web_development: {
    posts: [],
    loading: false
  },
  css: {
    posts: [],
    loading: false
  },
  javascript: {
    posts: [],
    loading: false
  },
  nodejs: {
    posts: [],
    loading: false
  },
  reactjs: {
    posts: [],
    loading: false
  },
  databases: {
    posts: [],
    loading: false
  },
  author: {
    name: '',
    posts: [],
    loading: false
  }
}

export default function (state = initialState, actions) {
  const { type, key, value } = actions

  switch (type) {
    case GET_CATEGORY_POSTS:
      return {
        ...state,
        [key]: {
          posts: [],
          loading: true
        }
      }
    case SET_CATEGORY_POSTS:
      return {
        ...state,
        all: {
          posts: [
            ...state.all.posts,
            ...value.filter((a) => (state.all.posts.length ? state.all.posts.some((b) => b._id === a._id) : true))
          ]
        },
        [key]: {
          posts: [...state[key].posts, ...value],
          loading: false
        }
      }

    case GET_AUTHOR_POSTS:
      return {
        ...state,
        author: {
          name: '',
          posts: [],
          loading: true
        }
      }
    case SET_AUTHOR_POSTS:
      return {
        ...state,
        all: {
          posts: [
            ...state.all.posts,
            ...value.posts.filter((a) => (state.all.posts.length ? state.all.posts.some((b) => b._id === a._id) : true))
          ]
        },
        author: {
          name: value.name,
          posts: [...state[key].posts, ...value.posts],
          loading: false
        }
      }

    case GET_CURRENT_POST:
      return {
        ...state,
        current: {
          post: null,
          loading: true
        }
      }
    case SET_CURRENT_POST:
      return {
        ...state,
        all: {
          posts: [
            ...state.all.posts,
            ...[value].filter((a) => (state.all.posts.length ? state.all.posts.some((b) => b._id === a._id) : true))
          ]
        },
        current: {
          post: value,
          loading: false
        }
      }

    case GET_SELF_POSTS:
      return {
        ...state,
        self: {
          ...state.self,
          loading: true
        }
      }
    case SET_SELF_POSTS:
      return {
        ...state,
        self: {
          posts: [...state.self.posts, ...value],
          loading: false
        }
      }

    default:
      return state
  }
}
