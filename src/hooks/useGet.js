import { useEffect, useReducer } from 'react'
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
    // console.log('ação', action.status_code)
    return {
      ...state,
      loading: false,
      data: action.data,
      error: {}
    }
  }
  if (action.type === 'FAILURE') {
    return {
      ...state,
      error: action.data,
      loading: false,
      data: {}
    }
  }
  return state
}

const useGet = url => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE)
  async function load () {
    try {
      dispatch({ type: 'REQUEST' })
      api.get(url).then(res => {
        dispatch({ type: 'SUCCESS', data: res.data, status_code: res.status })
      })
    } catch (error) {
      dispatch({ type: 'FAILURE', error: error.message, status_code: 500 })
    }
  }
  useEffect(() => {
    load()
  }, [])

  return { ...data, refetch: load }
}

export default useGet
