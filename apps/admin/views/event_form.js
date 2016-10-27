import veact from 'veact'
import { assign } from 'lodash'
import moment from 'moment'
import { type, smallMargin, grayRegular } from '../../../lib/styles'

const view = veact()

const { input, form, label, button, div } = view.els()

view.styles({
  label: assign(
    type('avantgarde', 'smallHeadline'),
    {
      padding: '10px 0',
      display: 'block'
    }
  ),
  errors: assign(
    type('garamond', 'body'),
    {
      background: 'red',
      padding: '10px',
      color: 'white'
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

view.render(({ event, onSubmit, buttonText, error }) => {
  return form({ onSubmit: onSubmit },
    (() => {
      if (error) {
        return div('.errors', error)
      }
    })(),
    label('.label', 'Event title'),
    input('.input', {
      name: 'name',
      placeholder: `Event Title`,
      value: event.get('name'),
      required: true,
      onChange: (e) => event.set('name', e.target.value)
    }),
    label('.label', 'Presented By'),
    input('.input', {
      name: 'presented_by',
      placeholder: `Presented By`,
      required: true,
      value: event.get('presented_by'),
      onChange: (e) => event.set('presented_by', e.target.value)
    }),
    label('.label', 'Closing Date'),
    input('.input', {
      name: 'closing_date',
      type: 'date',
      required: true,
      value: moment(event.get('closing_date')).format('YYYY-MM-DD'),
      onChange: (e) => event.set('closing_date', e.target.value)
    }),
    label('.label', 'Event Capacity'),
    input('.input', {
      name: 'capacity',
      placeholder: `Event capacity`,
      required: true,
      value: event.get('capacity'),
      onChange: (e) => event.set('capacity', e.target.value)
    }),
    label('.label', 'How Many Guests Can a User Invite?'),
    input('.input', {
      name: 'maximum_guests',
      placeholder: `How Many Guests Can a User Invite?`,
      required: true,
      value: event.get('maximum_guests'),
      onChange: (e) => event.set('maximum_guests', e.target.value)
    }),
    label('.label', 'Lock fields?'),
    input('.input', {
      type: 'checkbox',
      defaultChecked: event.get('lock_fields'),
      onClick: (e) => { event.set('lock_fields', e.target.checked) }
    }),
    button('.button', `${buttonText}`)
  )
})

export default view()
