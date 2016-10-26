import veact from 'veact'
import { state, createEvent } from '../controllers'
import { assign } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from '../../../lib/styles'
import EventForm from './event_form'

const view = veact()

const { div, h1, input, form, label, select, option, button, header, eventForm } = view.els({
  eventForm: EventForm
})

view.styles({
  formContainer: {
    margin: '50px 20px',
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

view.render(() => {
  return div('.formContainer',
    h1('.h1', 'New Event'),
    eventForm({ event: state.select('newEvent'), onSubmit: createEvent })
  )
})

export default view()
