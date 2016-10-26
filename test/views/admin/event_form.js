/* eslint-env mocha */
import { fixture, render } from '../helpers'
import EventForm from '../../../admin/views/event_form'

describe('EventForm', () => {
  it('renders form for the event', async () => {
    const props = {
      event: fixture('event'),
      onSubmit: () => {},
      buttonText: 'Create Event',
      error: ''
    }
    render(EventForm, props).html().should.containEql('Orta')
  })
})
