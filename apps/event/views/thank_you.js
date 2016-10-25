import veact from 'veact'
import { state, setNumOfGuests, createReservation } from '../controllers'
import { assign, times } from 'lodash'
import { type, smallMargin } from './lib'
import Header from './header'

const view = veact()

const { div, header, p, a } = view.els({
  header: Header
})

view.styles({
  container: {
    width: 400,
    margin: '0 auto'
  },
  button: assign(
    type('avantgarde', 'smallHeadline'),
    {
      display: 'block',
      'text-align': 'center',
      background: 'black',
      color: 'white',
      width: '100%',
      padding: 10,
      border: 'none',
      outline: 'none',
      margin: `${smallMargin} 0`
    }
  ),
  p: assign(
    type('garamond', 'body'),
    {
      margin: `${smallMargin} 0`
    }
  )
})

view.render(() =>
  div('.container',
    header(),
    p('.p', 'Thank you for your RSVP.'),
    p('.p', 'Sign up for an Artsy account to discover and buy the world\'s greatest art online'),
    a('.button', { href: "https://www.artsy.net/sign_up" }, 'Sign up')
  )
)

export default view()
