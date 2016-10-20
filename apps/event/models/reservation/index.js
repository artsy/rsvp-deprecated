import { model, string, array, objectid, date, number } from 'joiql-mongo'

export default model('reservation', {
  name: string(),
  email: string(),
  guests: array().items(string()),
  event_id: string(),
  created_at: date()
    .meta((is) => ({
      'create': is.forbidden().default(new Date())
    })),
})
