import { model, string, array, objectid, date, number } from 'joiql-mongo'

export default model('event', {
  name: string(),
  presented_by: string(),
  maximum_guests: number(),
  capacity: number(),
  created_at: date()
    .meta((is) => ({
      'create': is.forbidden().default(new Date())
    })),
})
