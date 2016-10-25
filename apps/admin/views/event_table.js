import veact from 'veact'
import { assign, map } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from '../../../lib/styles'
import EventRow from './event_row'

const view = veact()

const { table, thead, th, tr, tbody, eventRow } = view.els({
  eventRow: EventRow
})

view.styles({
  table: {
    width: '100%'
  },
  th: {
    textAlign: 'left',
    padding: `${smallMargin / 2}`
  },
  thead: assign(
    type('avantgarde', 'smallHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  tbody: assign(
    type('garamond', 'body'),
    { margin: `${smallMargin}px 0` }
  )
})

view.render(({ events }) => {
  return table('.table',
    thead('.thead',
      tr('.tr',
        th('.th', 'Event name'),
        th('.th', 'Closing Date'),
        th('.th', 'RSVP Count'),
      )
    ),
    tbody('.tbody',
      map(events, (event, index) => eventRow({ event, index }))
    )
  )
})

export default view()
