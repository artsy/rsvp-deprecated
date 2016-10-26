import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import Index from '../views'
import NewEvent from '../views/new_event'

const eventApi = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/event')
})

const reservationApi = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/reservation')
})

export const state = tree({
  events: [],
  newEvent: {}
})

export const index = async (ctx) => {
  const { events } = await ctx.bootstrap(() =>
    eventApi.query(`{ events { name capacity reservation_count } }`)
  )
  state.set('events', events)
  ctx.render({ body: Index })
}

export const newEvent = async (ctx) => {
  ctx.render({ body: NewEvent })
}
