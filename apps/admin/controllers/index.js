import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import Index from '../views'
import NewEvent from '../views/new_event'

const api = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api')
})

export const state = tree({
  events: [],
  newEvent: {}
})

export const index = async (ctx) => {
  const { events } = await ctx.bootstrap(() =>
    api.query(`{ events { name capacity reservation_count closing_date } }`)
  )
  state.set('events', events)
  ctx.render({ body: Index })
}

export const newEvent = async (ctx) => {
  ctx.render({ body: NewEvent })
}

export const editEvent = async (ctx) => {
  ctx.render({ body: EditEvent })
}

export const createEvent = async (e) => {
  e.preventDefault()
  await api.mutate(`{
    createEvent(
      name: "${state.get('newEvent').name}",
      presented_by: "${state.get('newEvent').presented_by}",
      closing_date: "${state.get('newEvent').closing_date}",
      capacity: ${state.get('newEvent').capacity},
      maximum_guests: ${state.get('newEvent').maximum_guests},
    ) {
      name
    }
  }`)
  window.location = `/admin`
}
