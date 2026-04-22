import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import SignIn from '../../src/pages/signIn'
import api from '../../src/services/api'
import usePost from '../../src/hooks/usePost'

jest.mock('../../src/hooks/usePost', () => jest.fn())
jest.mock('../../src/services/api', () => ({
  defaults: {
    headers: {}
  }
}))
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
jest.mock('react-hook-form', () => {
  const React = require('react')
  return {
    useForm: () => ({
      control: {},
      handleSubmit: callback => () => callback({ username: 'raphael', password: '123123' }),
      formState: { errors: {} }
    }),
    Controller: ({ render }) => render({ field: { onChange: jest.fn(), onBlur: jest.fn(), value: '' } })
  }
})

describe('SignIn page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should contains user and password inputs', () => {
    usePost.mockReturnValue([{ loading: false, data: '', error: '' }, jest.fn()])
    const { getByPlaceholderText } = render(<SignIn navigation={{ navigate: jest.fn() }} />)

    expect(getByPlaceholderText('seu usuário')).toBeTruthy()
    expect(getByPlaceholderText('sua senha')).toBeTruthy()
  })

  it('should submit credentials', async () => {
    const postMock = jest.fn()
    usePost.mockReturnValue([{ loading: false, data: '', error: '' }, postMock])

    const { getByText } = render(
      <SignIn navigation={{ navigate: jest.fn() }} />
    )

    fireEvent.press(getByText('Entrar'))

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith({ username: 'raphael', password: '123123' })
    })
  })

  it('should navigate to main when token exists', async () => {
    const navigateMock = jest.fn()
    usePost.mockReturnValue([{ loading: false, data: 'token-123', error: '' }, jest.fn()])

    render(<SignIn navigation={{ navigate: navigateMock }} />)

    await waitFor(() => {
      expect(api.defaults.headers.Authorization).toBe('Bearer token-123')
      expect(navigateMock).toHaveBeenCalledWith('Main')
    })
  })
})
