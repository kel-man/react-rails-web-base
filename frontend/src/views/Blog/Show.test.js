import React from 'react'
import BlogShow from './Show'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios'

jest.mock('axios')
jest.mock('../../components/CommentBox', () => () => (<div>CommentBox</div>))
describe('ui loads selected blog and can return to index', () => {
  const history = createMemoryHistory()
  const component = (
    <Router history={history}>
      <BlogShow />
    </Router>
  )
  it('loads the selected blog', async () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: '1',
          title: 'Example title',
          contents: 'Example contents',
        },
      })
    )
    render(component)
    await waitFor(() => {
      expect(screen.getByText('Example title'))
      expect(screen.getByText('Example contents'))
    })
  })
})
