import veact from 'veact'
import { assign, map } from 'lodash'
import { type, smallMargin, mediumMargin, grayRegular } from '../../../lib/styles'

const view = veact()

const { input, form, label, select, option, button } = view.els()

view.styles({
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

view.render(({ event, onSubmit }) => {
  console.log('event', event)
  return form({ onSubmit: onSubmit },
    label('.label', "Event title"),
    input('.input', {
      name: 'name',
      placeholder: `Event Title`,
      value: event.get('name'),
      required: true,
      onChange: (e) => event.set('name', e.target.value),
    }),
    label('.label', "Presented By"),
    input('.input', {
      name: 'presented_by',
      placeholder: `Presented By`,
      required: true,
      value: event.get('presented_by'),
      onChange: (e) => event.set('presented_by', e.target.value),
    }),
    label('.label', "Closing Date"),
    input('.input', {
      name: 'closing_date',
      type: 'date',
      required: true,
      value: event.get('closing_date'),
      onChange: (e) => event.set('closing_date', e.target.value),
    }),
    label('.label', "Event Capacity"),
    input('.input', {
      name: 'capacity',
      placeholder: `Event capacity`,
      required: true,
      value: event.get('capacity'),
      onChange: (e) => event.set('capacity', e.target.value),
    }),
    label('.label', "How Many Guests Can a User Invite?"),
    input('.input', {
      name: 'maximum_guests',
      placeholder: `How Many Guests Can a User Invite?`,
      required: true,
      value: event.get('maximum_guests'),
      onChange: (e) => event.set('maximum_guests', e.target.value),
    }),
    button('.button', 'Create Event')
  )
})

export default view()
