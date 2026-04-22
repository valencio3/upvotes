import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'

import Message from '../../src/pages/message'
import usePost from '../../src/hooks/usePost'

jest.mock('../../src/hooks/usePost', () => jest.fn())
jest.mock('react-hook-form', () => {
  const React = require('react')
  return {
    useForm: () => ({
      control: {},
      handleSubmit: callback => () => callback({ content: 'Nova mensagem de teste' }),
      formState: { errors: {} }
    }),
    Controller: ({ render }) => render({ field: { onChange: jest.fn(), onBlur: jest.fn(), value: '' } })
  }
})

describe('Message Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should contains message inputs', () => {
    usePost.mockReturnValue([{ loading: false, error: '', data: '' }, jest.fn()])
    const { getByPlaceholderText } = render(<Message />)

    expect(getByPlaceholderText('digite sua mensagem')).toBeTruthy()
  })

  it('should submit a new message', async () => {
    const postMock = jest.fn()
    const goBackMock = jest.fn()
    usePost.mockReturnValue([{ loading: false, error: '', data: '' }, postMock])

    const { getByText } = render(
      <Message navigation={{ goBack: goBackMock }} />
    )

    fireEvent.press(getByText('Cadastrar'))

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith({ content: 'Nova mensagem de teste' })
      expect(goBackMock).toHaveBeenCalled()
    })
  })
})
