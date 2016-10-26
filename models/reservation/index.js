import { model, string, array, date, boolean, db } from 'joiql-mongo'
import { assign } from 'lodash'
import event from '../event/index.js'

const reservation = model('reservation', {
  name: string(),
  email: string(),
  guests: array().items(string()),
  event_id: string(),
  created_at: date()
    .meta((is) => ({
      'create': is.forbidden().default(new Date())
    })),
  is_waitlisted: boolean()
    .meta((is, something) => ({
      'delete create': is.forbidden()
    }))
})

const isReservationWaitlisted = async (reservation) => {
  const reservationEvent = await event.find({ _id: `${reservation.event_id}` })
  const reservationCount = await db.reservations.count({ event_id: `${reservation.event_id}` })
  return reservationEvent.capacity <= reservationCount
}

const isWaitlistedMiddleware = async (ctx, next) => {
  await next()
  const isWaitlisted = await isReservationWaitlisted(ctx.res.createReservation)
  await reservation.update(assign(ctx.res.createReservation, {
    _id: `${ctx.res.createReservation._id}`,
    is_waitlisted: isWaitlisted
  }))
}

reservation.on('create', isWaitlistedMiddleware)

export default reservation
