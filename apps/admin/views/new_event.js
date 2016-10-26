import veact from 'veact'
import { state, createEvent } from '../controllers'
import { assign } from 'lodash'
import { type } from '../../../lib/styles'
import EventForm from './event_form'
import Header from './header'

const view = veact()

const { div, h1, eventForm, header } = view.els({
  eventForm: EventForm,
  header: Header
})

view.styles({
  formContainer: {
    margin: '100px 20px',
    maxWidth: '600px'
  },
  h1: assign(
    type('garamond', 'largeHeadline'),
    {
      padding: '10px 0',
      display: 'block'
    }
  )
})

view.render(() =>
  div(
    header(),
    div('.formContainer',
      h1('.h1', 'New Event'),
      eventForm({
        event: state.select('newEvent'),
        onSubmit: createEvent,
        buttonText: 'Create Event',
        error: state.get('error')
      })
    )
  )

)

export default view()
