import veact from 'veact'
import { state, updateEvent } from '../controllers'
import { assign } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from '../../../lib/styles'
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
      h1('.h1', 'Edit Event'),
      eventForm({
        event: state.select('event'),
        onSubmit: updateEvent,
        buttonText: 'Update Event'
      })
    )
  )
)

export default view()
