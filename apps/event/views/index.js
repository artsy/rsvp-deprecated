import veact from 'veact'
import { state, setNumOfGuests, createReservation } from '../controllers'
import { assign, times } from 'lodash'
import { type, smallMargin, grayRegular } from '../../../lib/styles'
import Header from './header'

const view = veact()

const { div, input, form, label, select, option, button, header } = view.els({
  header: Header
})

view.styles({
  container: {
    width: 400,
    margin: '0 auto'
  },
  errors: assign(
    type('garamond', 'body'),
    {
      background: 'red',
      padding: '10px',
      color: 'white'
    }
  ),
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
    header(),
    (() => {
      if (state.get('error')) {
        return div('.errors', state.get('error'))
      }
    })(),
    form({ onSubmit: createReservation },
      label('.label', 'Name'),
      input('.input', {
        name: 'name',
        value: state.get('reservation').name,
        disabled: state.get('event').lock_fields,
        required: true,
        placeholder: `Name`,
        onChange: (e) => state.select('reservation').set('name', e.target.value)
      }),
      label('.label', 'Email'),
      input('.input', {
        name: 'email',
        value: state.get('reservation').email,
        required: true,
        disabled: state.get('event').lock_fields,
        placeholder: `Email`,
        onChange: (e) => state.select('reservation').set('email', e.target.value)
      }),
      label('.label', 'How many guests would you like to bring?'),
      select({ onChange: (e) => setNumOfGuests(e.target.value), defaultValue: state.get('num_of_guests') }, (() => {
        let els = []
        times(state.get('event').maximum_guests + 1, (index) => {
          els.push(option({ value: index }, index))
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
