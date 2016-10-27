import veact from 'veact'
import { assign } from 'lodash'
import moment from 'moment'
import { type, smallMargin } from '../../../lib/styles'

const view = veact()

const { tr, td, div } = view.els()

view.styles({
  tr: assign(
    type('garamond', 'largeHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  h5: assign(
    type('avantgarde', 'smallHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  td: {
    padding: `${smallMargin / 2}`,
    cursor: 'pointer'
  },
  'tr--odd': {
    background: '#eee'
  },
  'circle--red': {
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    background: 'red'
  },
  'circle--green': {
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    background: 'green'
  },
  header: {
    textAlign: 'center'
  }
})

view.render(({ reservation, index }) => {
  const rowClass = index % 2 ? '.tr--even' : '.tr--odd'
  return tr(`${rowClass}`,
    td('.td', div(`.circle--${(reservation.is_waitlisted ? 'red' : 'green')}`, ' ')),
    td('.td', reservation.name),
    td('.td', reservation.guests.join(', ')),
    td('.td', moment.utc(reservation.created_at).calendar())
  )
})

export default view()
