import veact from 'veact'
import moment from 'moment'
import { groupBy, assign } from 'lodash'
import { state } from '../controllers'
import { type } from '../../../lib/styles'
import EventTable from './event_table'
import Header from './header'

const view = veact()

const { div, eventTable, header, h1 } = view.els({
  eventTable: EventTable,
  header: Header
})

view.styles({
  container: {
    margin: '100px 20px'
  },
  formContainer: {
    paddingBottom: '100px'
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
  const { current, past } = groupBy(state.get('events'), (event) => {
    if(moment(event.closing_date).isBefore(moment(), 'day')){
      return 'past'
    }
    return 'current'
  })

  return div(
    header(),
    div('.container',
      div('.formContainer',
        h1('.h1', 'Current Events'),
        eventTable({ events: current })
      ),
      div('.formContainer',
        h1('.h1', 'Past Events'),
        eventTable({ events: past })
      )
    )
  )
})

export default view()
