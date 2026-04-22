import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import SignUp from '../../src/pages/signUp'
import usePost from '../../src/hooks/usePost'

jest.mock('../../src/hooks/usePost', () => jest.fn())
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
jest.mock('react-hook-form', () => {
  const React = require('react')
  return {
    useForm: () => ({
      control: {},
      handleSubmit: callback => () => callback({ username: 'new-user', password: '123123' }),
      formState: { errors: {} }
    }),
    Controller: ({ render }) => render({ field: { onChange: jest.fn(), onBlur: jest.fn(), value: '' } })
  }
})

describe('SignUp page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should contains user and password inputs', () => {
    usePost.mockReturnValue([{ loading: false, data: '', error: '' }, jest.fn()])
    const { getByPlaceholderText } = render(<SignUp navigation={{ goBack: jest.fn() }} />)

    expect(getByPlaceholderText('seu usuário')).toBeTruthy()
    expect(getByPlaceholderText('sua senha')).toBeTruthy()
  })

  it('should submit sign up and go back', async () => {
    const postMock = jest.fn()
    const goBackMock = jest.fn()
    usePost.mockReturnValue([{ loading: false, data: '', error: '' }, postMock])

    const { getByText } = render(
      <SignUp navigation={{ goBack: goBackMock }} />
    )

    fireEvent.press(getByText('Cadastrar'))

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith({ username: 'new-user', password: '123123' })
      expect(goBackMock).toHaveBeenCalled()
    })
  })
})
