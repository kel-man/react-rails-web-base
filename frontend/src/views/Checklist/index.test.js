import React from 'react'
import Checklist from './'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import axios from 'axios'

jest.mock('axios')
describe('interface is operating correctly', () => {
  const component = (
    <Router history={createMemoryHistory()}>
      <Checklist />
    </Router>
  )

  it('typing into the textfield changes input value', async () => {
    axios.mockImplementationOnce(() => Promise.resolve({ data: { items: [] } }))
    render(component)
    const topic = screen.getByTestId('topic')
    const contents = screen.getByTestId('contents')

    expect(topic.value).toBe('')
    userEvent.type(topic, 'item topic')
    await waitFor(() => expect(topic.value).toBe('item topic'))
  })
  // it('highlights the currently selected item on the topics list on the left', async () => {
  //   const { getByTestId } = render(component)
  // })
})
