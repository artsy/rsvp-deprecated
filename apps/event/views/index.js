import veact from 'veact'
import { state } from '../controllers'
import { assign } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from './lib'

const view = veact()

const { div, h5, h1, input } = view.els()

view.styles({
  h1: assign(
    type('garamond', 'largeHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  h5: assign(
    type('avantgarde', 'smallHeadline'),
    { margin: `${smallMargin}px 0` }
  ),
  container: {
    width: 400,
    margin: '0 auto'
  },
  header: {
    textAlign: 'center'
  },
  input: assign(
    type('garamond', 'body'),
    {
      width: '100%',
      border: `2px solid ${grayRegular}`,
      marginBottom: '10px',
      padding: 5,
      outline: 'none'
    }
  )
})

view.render(() =>
  div('.container',
    div('.header',
      h5('.h5', state.get('event').presented_by),
      h1('.h1', state.get('event').name),
    ),
    input('.input', {
      placeholder: `Name`,
    }),
    input('.input', {
      placeholder: `Email`,
    })
  )
)

export default view()
