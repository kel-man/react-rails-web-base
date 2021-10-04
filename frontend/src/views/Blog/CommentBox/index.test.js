import React from 'react'
import CommentBox from './'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios'

jest.mock('axios')
// jest.mock('../../components/CommentBox', () => () => (<div>CommentBox</div>))
describe('ui loads selected blog and can return to index', () => {
  const history = createMemoryHistory()
  const component = (
    <Router history={history}>
      <CommentBox />
    </Router>
  )
  it('displays comments belonging to current blog in a list', async () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          blogComments: [{
            id: '1',
            comment: 'Example contents',
          },]
        },
      })
    )
    render(component)
    await waitFor(() => {
      expect(screen.getByText('Example contents'))
    })
  })

})
