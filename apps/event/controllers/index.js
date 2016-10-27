import Lokka from 'lokka'
import { times } from 'lodash'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import Index from '../views'
import ThankYou from '../views/thank_you'
import qs from 'qs'

const api = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/rsvp')
})

export const state = tree({
  event: {},
  reservation: {},
  error: '',
  num_of_guests: 0
})

export const index = async (ctx) => {
  const { name, email } = qs.parse(ctx.querystring)
  const { event } = await ctx.bootstrap(() =>
    api.query(`{ event(_id: "${ctx.params.id}") { name presented_by maximum_guests lock_fields } }`)
  )
  state.set('event', event)
  state.set('reservation', {
    name: (name ? name : ''),
    email: (email ? email : ''),
    event_id: ctx.params.id,
    guests: []
  })

  ctx.render({ body: Index })
}

export const thankYou = async (ctx) => {
  const { event } = await ctx.bootstrap(() =>
    api.query(`{ event(_id: "${ctx.params.id}") { name presented_by is_at_capacity } }`)
  )
  state.set('event', event)
  ctx.render({ body: ThankYou })
}

export const setNumOfGuests = async (num) => {
  state.set('num_of_guests', num)
}

export const createReservation = async (e) => {
  e.preventDefault()
  let guests = []
  if (!state.get('reservation').name) {
    return state.set("error", 'Name required')
  }
  if (!state.get('reservation').email) {
    return state.set("error", 'Email required')
  }
  times(state.get('num_of_guests'), (index) => {
    guests.push(`"${e.target[`guests[${index}]`].value}"`)
  })
  state.select('reservation').set('guests', guests)
  await api.mutate(`{
    reservation: createReservation(
      name: "${state.get('reservation').name}",
      email: "${state.get('reservation').email}",
      guests: [${guests}],
      event_id: "${state.get('reservation').event_id}"
    ) {
      name
    }
  }`)
  window.location = `/${state.get('reservation').event_id}/thank-you`
}
