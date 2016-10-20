import veact from 'veact'
import { state, setNumOfGuests } from '../controllers'
import { assign, times } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from './lib'

const view = veact()

const { div, h5, h1, input, label, select, option } = view.els()

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
  label: assign(
    type('avantgarde', 'smallHeadline'),
    {
      padding: '10px 0',
      display: 'block'
    }
  ),
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
    label('.label', "Name"),
    input('.input', {
      placeholder: `Name`,
    }),
    label('.label', "Email"),
    input('.input', {
      placeholder: `Email`,
    }),
    label('.label', "How many guests would you like to bring?"),
    select({ onChange: (e) => setNumOfGuests(e.target.value) }, (() => {
      let els = []
      times(state.get('event').maximum_guests, (index) => {
        els.push( option({
          value: index,
          selected: state.get('num_of_guests') === index
        }, index) )
      })
      return els
    })()),
    (() => {
      let els = []
      times(state.get('num_of_guests'), (index) => {
        els.push([
          label('.label', `Your Guests Name`),
          input('.input', { name: `guests[]` })
        ])
      })
      return els
    })()
  )
)

export default view()
