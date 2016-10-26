import veact from 'veact'
import { assign } from 'lodash'
import moment from 'moment'
import { type, smallMargin, grayRegular } from '../../../lib/styles'

const view = veact()

const { tr, td } = view.els()

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
    background: '#eee',
  },
  header: {
    textAlign: 'center'
  }
})

view.render(({ event, index }) => {
  const rowClass = index % 2 ? '.tr--even' : '.tr--odd'
  return tr(`${rowClass}`, { onClick: (e) => window.location = `/admin/${event._id}` },
    td('.td', event.name),
    td('.td', moment.utc(event.closing_date).calendar()),
    td('.td', `${event.reservation_count} / ${event.capacity}`)
  )
})

export default view()
