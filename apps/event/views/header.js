import veact from 'veact'
import { state } from '../controllers'
import { assign } from 'lodash'
import { type, smallMargin } from '../../../lib/styles'

const view = veact()

const { div, h5, h1 } = view.els()

view.styles({
  h1: assign(
    type('garamond', 'largeHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  h5: assign(
    type('avantgarde', 'smallHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  header: {
    textAlign: 'center'
  }
})

view.render(() =>
  div('.header',
    h5('.h5', state.get('event').presented_by),
    h1('.h1', state.get('event').name),
  ),
)

export default view()
