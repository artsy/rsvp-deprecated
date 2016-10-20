import veact from 'veact'
import { state, setNumOfGuests, createReservation } from '../controllers'
import { assign, times } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from './lib'

const view = veact()

const { div, h5, h1, input, form, label, select, option, button } = view.els()

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
  ),
  button: assign(
    type('avantgarde', 'mediumHeadline'),
    {
      background: 'black',
      color: 'white',
      width: '100%',
      padding: 10,
      border: 'none',
      margin: `${smallMargin} 0`
    }
  )
})

view.render(() =>
  div('.container',
    div('.header',
      h5('.h5', state.get('event').presented_by),
      h1('.h1', state.get('event').name),
    ),
    form({onSubmit: createReservation },
      label('.label', "Name"),
      input('.input', {
        name: 'name',
        placeholder: `Name`,
        onChange: (e) => state.select('reservation').set('name', e.target.value),
      }),
      label('.label', "Email"),
      input('.input', {
        name: 'email',
        placeholder: `Email`,
        onChange: (e) => state.select('reservation').set('email', e.target.value),
      }),
      label('.label', "How many guests would you like to bring?"),
      select({ onChange: (e) => setNumOfGuests(e.target.value), defaultValue: state.get('num_of_guests') }, (() => {
        let els = []
        times(state.get('event').maximum_guests, (index) => {
          els.push( option({ value: index }, index) )
        })
        return els
      })()),
      (() => {
        let els = []
        times(state.get('num_of_guests'), (index) => {
          els.push([
            label('.label', `Your Guests Name`),
            input('.input', { name: `guests[${index}]` })
          ])
        })
        return els
      })(),
      button('.button', 'RSVP')
    )
  )
)

export default view()
