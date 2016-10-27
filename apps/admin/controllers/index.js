import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import moment from 'moment'
import json2csv from 'json2csv'
import Index from '../views'
import NewEvent from '../views/new_event'
import EditEvent from '../views/edit_event'
import { map, sortBy } from 'lodash'

const api = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/rsvp')
})

export const state = tree({
  events: [],
  newEvent: {},
  event: {},
  reservations: []
})

export const index = async (ctx) => {
  const { events } = await ctx.bootstrap(() =>
    api.query(`{ events { name capacity reservation_count closing_date _id } }`)
  )
  state.set('events', events)
  ctx.render({ body: Index })
}

export const newEvent = async (ctx) => {
  ctx.render({ body: NewEvent })
}

export const editEvent = async (ctx) => {
  const { event, reservations } = await ctx.bootstrap(() =>
    api.query(`{ event(_id: "${ctx.params.id}") {
      name capacity presented_by maximum_guests reservation_count closing_date _id lock_fields
    } reservations(event_id: "${ctx.params.id}"){
      name is_waitlisted email guests created_at
    } }`)
  )
  state.set('event', event)
  state.set('reservations', sortBy(reservations, (rsvp) => - new Date(rsvp.created_at)))
  ctx.render({ body: EditEvent })
}

export const updateEvent = async (e) => {
  e.preventDefault()
  try {
    await api.mutate(`{
      updateEvent(
        _id: "${state.get('event')._id}",
        name: "${state.get('event').name}",
        presented_by: "${state.get('event').presented_by}",
        closing_date: "${moment(state.get('event').closing_date).format()}",
        capacity: ${state.get('event').capacity},
        maximum_guests: ${state.get('event').maximum_guests},
        lock_fields: ${state.get('event').lock_fields}
      ) {
        name
      }
    }`)
    window.location = `/admin`
  } catch (err) {
    state.set('error', err.rawError[0].message)
  }
}

export const createEvent = async (e) => {
  e.preventDefault()
  try {
    await api.mutate(`{
      createEvent(
        name: "${state.get('newEvent').name}",
        presented_by: "${state.get('newEvent').presented_by}",
        closing_date: "${state.get('newEvent').closing_date}",
        capacity: ${state.get('newEvent').capacity},
        maximum_guests: ${state.get('newEvent').maximum_guests},
        lock_fields: ${state.get('event').lock_fields}
      ) {
        name
      }
    }`)
    window.location = `/admin`
  } catch (err) {
    console.log('err', err)
    state.set('error', err.rawError[0].message)
  }
}

export const rsvpsToCsv = async (ctx) => {
  const { reservations } = await ctx.bootstrap(() =>
    api.query(`{ reservations(event_id: "${ctx.params.id}"){
      name is_waitlisted email guests created_at
    } }`)
  )
  const fields = ['name', 'is_waitlisted', 'email', 'guests', 'created_at']
  const data = map(reservations, (rsvp) => {
    rsvp.guests = rsvp.guests.toString().replace(',', ' and ')
    return rsvp
  })
  const csv = json2csv({ fields: fields, data: data, quotes: '' })
  ctx.set('Content-disposition', `attachment; filename=${ctx.params.id}_rsvps.csv`)
  ctx.set('Content-Type', 'text/csv')
  ctx.body = csv
}
