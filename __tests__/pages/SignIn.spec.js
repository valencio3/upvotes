import React from 'react'
// import renderer from 'react-test-renderer'
import { render } from '@testing-library/react-native'

import SignIn from '../../src/pages/signIn'
import api from '../../src/services/api'
describe(
  'SignIn page', () => {
    it('should contains user and password inputs', async () => {
      const { getByPlaceholderText } = render(<SignIn />)

      expect(getByPlaceholderText('seu usuário')).toBeTruthy()
      expect(getByPlaceholderText('sua senha')).toBeTruthy()
    })

    it('should login on app with the credentials', async () => {
      const data = {
        username: 'raphael',
        password: '123123'
      }

      const response = await api.post('sign-in', data)
      expect(response.status).toEqual(200)
    })
  })
