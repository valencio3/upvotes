import React from 'react'
import { render } from '@testing-library/react-native'
import { first } from 'random-name'

import api from '../../src/services/api'

import SignUp from '../../src/pages/SignUp'

describe('SignUp page', () => {
  // jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon')
  // jest.mock('react-native-vector-icons/MaterialIcons', () => jest.genMockFromModule('react-native-vector-icons/MaterialIcons'))

  it('should contains user and password inputs', async () => {
    const { getByPlaceholderText } = render(<SignUp />)

    expect(getByPlaceholderText('seu usuário')).toBeTruthy()
    expect(getByPlaceholderText('sua senha')).toBeTruthy()
  })

  it('should create a user', async () => {
    const data = {
      username: first(),
      password: '123123'
    }
    const response = await api.post('sign-up', data)

    expect(response.status).toEqual(200)
  })
})
