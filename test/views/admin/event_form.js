/* eslint-env mocha */
import Baobab from 'baobab'
import { fixture, render } from '../../helpers'
import EventForm from '../../../apps/admin/views/event_form'

describe('EventForm', () => {
  let event

  beforeEach(() => {
    event = new Baobab({ event: fixture('event') })
  })

  it('renders form for the event', async () => {
    const props = {
      event: event,
      onSubmit: () => {},
      buttonText: 'Create Event',
      error: ''
    }
    render(EventForm, props).html().should.containEql('Create Event')
  })
})
