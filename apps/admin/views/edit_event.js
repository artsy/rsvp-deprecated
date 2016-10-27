import veact from 'veact'
import { state, updateEvent } from '../controllers'
import { assign } from 'lodash'
import { type } from '../../../lib/styles'
import EventForm from './event_form'
import ReservationTable from './reservation_table'
import Header from './header'

const view = veact()

const { div, h1, eventForm, header, reservationTable } = view.els({
  header: Header,
  eventForm: EventForm,
  reservationTable: ReservationTable
})

view.styles({
  formContainer: {
    display: 'inline-block',
    margin: '100px 20px',
    width: '35%',
    'vertical-align': 'top'
  },
  reservationContainer: {
    display: 'inline-block',
    margin: '100px 20px',
    width: '55%',
    'vertical-align': 'top'
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
        buttonText: 'Update Event',
        error: state.get('error')
      })
    ),
    div('.reservationContainer',
      h1('.h1', `${(state.get('event').reservation_count)} RSVPs`),
      reservationTable({ reservations: state.get('reservations') })
    )
  )
)

export default view()
