import React from 'react'
import { render } from '@testing-library/react-native'

import Main from '../../src/pages/main'
import useGet from '../../src/hooks/useGet'
import usePost from '../../src/hooks/usePost'

jest.mock('../../src/hooks/useGet', () => jest.fn())
jest.mock('../../src/hooks/usePost', () => jest.fn())
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() })
}))

describe('Main page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render feed items', () => {
    useGet.mockReturnValue({
      loading: false,
      error: {},
      data: [
        {
          id: 1,
          content: 'Mensagem de teste',
          author: { username: 'raphael' },
          likes: 2,
          loves: 1,
          activeUserLikedIt: 0,
          activeUserLovedIt: 0
        }
      ],
      refetch: jest.fn()
    })
    usePost.mockReturnValue([{}, jest.fn()])

    const { getByText, getAllByText } = render(<Main />)

    expect(getByText('Mensagens')).toBeTruthy()
    expect(getAllByText('Mensagem de teste').length).toBeGreaterThan(0)
    expect(getAllByText('Autor: raphael').length).toBeGreaterThan(0)
  })

  it('should request expected resources in hooks', () => {
    useGet.mockReturnValue({ loading: false, error: {}, data: [], refetch: jest.fn() })
    usePost.mockReturnValue([{}, jest.fn()])

    render(<Main />)

    expect(useGet).toHaveBeenCalledWith('feeds')
    expect(usePost).toHaveBeenCalledWith('reaction')
  })
})
