import veact from 'veact'
import { assign, map } from 'lodash'
import { type, smallMargin } from '../../../lib/styles'
import ReservationRow from './reservation_row'

const view = veact()

const { table, thead, th, tr, td, tbody, reservationRow } = view.els({
  reservationRow: ReservationRow
})

view.styles({
  table: {
    width: '100%'
  },
  th: {
    textAlign: 'left',
    padding: `${smallMargin / 2}`
  },
  td: {
    textAlign: 'center',
    padding: '10px',
    background: '#eee'
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

view.render(({ reservations }) =>
  table('.table',
    thead('.thead',
      tr('.tr',
        th('.th', ''),
        th('.th', 'Name'),
        th('.th', 'Email'),
        th('.th', 'Guests'),
        th('.th', 'RSVP Date'),
      )
    ),
    tbody('.tbody',
      (() => {
        if (reservations) {
          return map(reservations, (reservation, index) => reservationRow({ reservation, index }))
        }
        return tr(td('.td', { colSpan: 4 }, 'No RSVPs yet'))
      })()
    )
  )
)

export default view()
