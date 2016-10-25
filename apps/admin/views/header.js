import veact from 'veact'
import { assign } from 'lodash'
import { type, smallMargin, grayRegular } from '../../../lib/styles'

const view = veact()

const { div, strong, a } = view.els()

view.styles({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '50px',
    lineHeight: '50px',
    borderBottom: `1px solid ${grayRegular}`,
    background: 'white',
    padding: `0 30px`
  },
  strong:  assign(
    type('avantgarde', 'smallHeadline'),
    {
      margin: `${smallMargin}px 0`,
      lineHeight: '50px',
    }
  ),
  btn: assign(
    type('avantgarde', 'smallHeadline'),
    {
      display: 'inline-block',
      'text-align': 'center',
      background: 'black',
      color: 'white',
      padding: 10,
      border: 'none',
      outline: 'none',
      float: 'right',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  )
})

view.render(({ event, index }) =>
  div('.header',
    strong('.strong', 'Events'),
    a('.btn', { href: '/admin/new_event' }, 'New Event')
  )
)

export default view()
