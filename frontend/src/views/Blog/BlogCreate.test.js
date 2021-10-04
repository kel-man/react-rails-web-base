import React from 'react'
import BlogCreate from './BlogCreate'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios'

describe('typing into textfields produces usable input', () => {
  const history = createMemoryHistory()
  const component = (
    <Router history={history}>
      <BlogCreate />
    </Router>
  )
  it('types into textfields', async () => {
    render(component)
    // await waitFor(() => {
    expect(screen.getByTestId('title').value).toBe('')
    expect(screen.getByTestId('contents').value).toBe('')
    // })
    userEvent.type(screen.getByTestId('title'), 'New blog title')
    userEvent.type(screen.getByTestId('contents'), 'New blog contents')
    await waitFor(() => {
      expect(screen.getByTestId('title').value).toBe('New blog title')
      expect(screen.getByTestId('contents').value).toBe('New blog contents')
    })
  })
})
