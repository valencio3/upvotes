// import React from 'react'
// import { render } from '@testing-library/react-native'

import api from '../../src/services/api'

// import Main from '../../src/pages/Main'

describe('Main page', () => {
  it('should list the feed', async () => {
    const data = {
      username: 'raphael',
      password: '123123'
    }

    const responseLogin = await api.post('sign-in', data)

    api.defaults.headers.Authorization = `Bearer ${responseLogin.data}`

    const response = await api.get('feeds')

    expect(response.status).toEqual(200)
  })
})
