import React from 'react'
import BlogIndex from './BlogIndex'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router, MemoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios'

jest.mock('axios')
describe('ui can switch between views and be interacted with', () => {
  const history = createMemoryHistory()
  history.push = jest.fn()
  const component = (
    <Router history={history}>
      <BlogIndex />
    </Router>
  )
  it('puts values into textfields upon user input', async () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          blogs: [
            { title: 'Example title', contents: 'Example contents', id: '1' },
            { title: 'Second example title', contents: 'Second example contents', id: '2' },
          ],
        },
      })
    )
    render(component)
    // const blogCreate = screen.getByTestId('blogCreate')
    await waitFor(() => {
      userEvent.click(screen.getByText('Post New Blog'))
    })
    expect(history.push).toHaveBeenCalledWith('/_/blog/create')
    // screen.debug()
  })
})
