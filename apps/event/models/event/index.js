import { each, map, reduce } from 'lodash'
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
    const count = await reservationCount(event._id)
    event.is_at_capacity = count >= event.capacity
    return count
  }))
}

const capacityReadMiddleware = async (ctx, next) => {
  await next()
  const count = await reservationCount(ctx.res.event._id)
  ctx.res.event.is_at_capacity = count >= ctx.res.event.capacity
}

event.on('list', capacityListMiddleware)
event.on('read', capacityReadMiddleware)

const reservationCount = async (event_id) => {
  const reservations = await db.reservations.find({ event_id: `${event_id}` }).toArray()
  return reduce(reservations, (count, reservation) => {
    if (reservation.guests) {
      return 1 + reservation.guests.length + count
    }
    return 1 + count
  }, 0)
}

const countListMiddleware = async (ctx, next) => {
  await next()
  await Promise.all(map(ctx.res.events, async (event) => {
    return await reservationCount(event._id)
  }))
}

const countReadMiddleware = async (ctx, next) => {
  await next()
  ctx.res.event.reservation_count = await reservationCount(ctx.res.event._id)
}

event.on('list', countListMiddleware)
event.on('read', countReadMiddleware)


export default event