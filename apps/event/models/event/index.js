import { each, map } from 'lodash'
import { model, string, array, objectid, date, number, boolean, db } from 'joiql-mongo'

const event = model('event', {
  name: string(),
  presented_by: string(),
  maximum_guests: number(),
  capacity: number(),
  is_at_capacity: boolean()
    .meta((is) => ({
      'update delete create': is.forbidden()
    })),
  created_at: date()
    .meta((is) => ({
      'create': is.forbidden().default(new Date())
    })),
  reservation_count: number()
    .meta((is) => ({
      'update delete create': is.forbidden()
    }))
})

const capacityListMiddleware = async (ctx, next) => {
  await next()
  await Promise.all(map(ctx.res.events, async (event) => {
    const count = await event.reservation_count
    event.is_at_capacity = count >= event.capacity
    return count
  }))
}

const capacityReadMiddleware = async (ctx, next) => {
  await next()
  const count = await event.reservation_count
  ctx.res.event.is_at_capacity = count >= event.capacity
}

event.on('list', capacityListMiddleware)
event.on('read', capacityReadMiddleware)

const findReservations = async (event_id) => {
  const reservations = await db.reservations.find({ event_id: `${event_id}` }).toArray()
  return reservations.length
}

const countListMiddleware = async (ctx, next) => {
  await next()
  each(ctx.res.events, (event) => {
    event.reservation_count = findReservations(event._id)
  })
}

const countReadMiddleware = async (ctx, next) => {
  await next()
  ctx.res.event.reservation_count = findReservations(ctx.res.event._id)
}

event.on('list', countListMiddleware)
event.on('read', countReadMiddleware)

export default event