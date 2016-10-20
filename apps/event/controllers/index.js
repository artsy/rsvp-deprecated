import Lokka from 'lokka'
import { times } from 'lodash'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import Index from '../views'

const api = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/event')
})

const reservationApi = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/reservation')
})

export const state = tree({
  event: {},
  reservation: {},
  num_of_guests: 0,
})

export const index = async (ctx) => {
  const { event } = await ctx.bootstrap(() =>
    api.query(`{ event(_id: "${ctx.params.id}") { name presented_by maximum_guests } }`)
  )
  state.set('event', event)
  state.set('reservation', {
    name: '',
    email: '',
    event_id: ctx.params.id,
    guests: []
  })
  ctx.render({ body: Index })
}

export const setNumOfGuests = async (num) => {
  state.set('num_of_guests', num)
}

export const createReservation = async (e) => {
  e.preventDefault()
  let guests = []
  times(state.get('num_of_guests'), (index) => {
    guests.push(`"${e.target[`guests[${index}]`].value}"`)
  })
  state.select('reservation').set('guests', guests)
  await reservationApi.mutate(`{
    tweet: createReservation(
      name: "${state.get('reservation').name}",
      email: "${state.get('reservation').email}",
      guests: [${guests}],
      event_id: "${state.get('reservation').event_id}"
    ) {
      name
    }
  }`)
  window.location(`/events/${state.get('reservation').event_id}`)
}