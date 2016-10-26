import veact from 'veact'
import { state } from '../controllers'
import { assign } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from '../../../lib/styles'

const view = veact()

const { div, h1, input, form, label, select, option, button, header} = view.els()

view.styles({
  container: {
    margin: '50px 20px',
    maxWidth: '600px'
  },
  h1: assign(
    type('garamond', 'largeHeadline'),
    {
      padding: '10px 0',
      display: 'block'
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

view.render(() => {
  return div('.container',
    h1('.h1', 'New Event'),
    form('',
      label('.label', "Event title"),
      input('.input', {
        name: 'name',
        placeholder: `Event Title`,
        onChange: (e) => state.select('newEvent').set('name', e.target.value),
      }),
      label('.label', "Presented By"),
      input('.input', {
        name: 'presented_by',
        placeholder: `Presented By`,
        onChange: (e) => state.select('newEvent').set('presented_by', e.target.value),
      }),
      label('.label', "How many guests would you like to bring?"),
      input('.input', {
        name: 'closing_date',
        type: 'date',
        onChange: (e) => state.select('newEvent').set('presented_by', e.target.value),
      }),
      label('.label', "Event Capacity"),
      input('.input', {
        name: 'capacity',
        placeholder: `Event capacity`,
        onChange: (e) => state.select('newEvent').set('capacity', e.target.value),
      }),
      label('.label', "How Many Guests Can a User Invite?"),
      input('.input', {
        name: 'maximum_guests',
        placeholder: `How Many Guests Can a User Invite?`,
        onChange: (e) => state.select('newEvent').set('maximum_guests', e.target.value),
      }),
      button('.button', 'Create Event')
    )
  )
})

export default view()
