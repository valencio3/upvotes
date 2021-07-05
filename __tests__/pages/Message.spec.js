import React from 'react'
import { render } from '@testing-library/react-native'

import api from '../../src/services/api'

import Message from '../../src/pages/message'

describe('Message Page', () => {
  it('should contains message inputs', async () => {
    const { getByPlaceholderText } = render(<Message />)

    expect(getByPlaceholderText('digite sua mensagem')).toBeTruthy()
  })

  it('should create a new message', async () => {
    const data = {
      username: 'raphael',
      password: '123123'
    }

    const responseLogin = await api.post('sign-in', data)

    api.defaults.headers.Authorization = `Bearer ${responseLogin.data}`

    const response = await api.post('feed', {
      content: 'Ação para testar cadastro'
    })

    expect(response.status).toEqual(201)
  })
})
