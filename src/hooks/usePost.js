import { useReducer } from 'react'
import api from '../services/api'

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: {},
  status_code: null
}

const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      data: action.data,
      error: {},
      loading: false
    }
  }
  if (action.type === 'FAILURE') {
    return {
      error: action.data,
      data: {},
      loading: false
    }
  }
  return state
}

const usePost = resource => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  const post = async data => {
    try {
      dispatch({ type: 'REQUEST' })
      const response = await api.post(resource, data)
      dispatch({ type: 'SUCCESS', data: response.data, status_code: response.status })
    } catch (error) {
      dispatch({ type: 'FAILURE', data: error.message, status_code: 500 })
    }
  }

  return [data, post]
}

export default usePost
