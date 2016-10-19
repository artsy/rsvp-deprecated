import Lokka from 'lokka'
import Transport from 'lokka-transport-http'
import tree from 'universal-tree'
import Index from '../views'

const api = new Lokka({
  transport: new Transport(process.env.APP_URL + '/api/event')
})

export const state = tree({
  event: {}
})

export const index = async (ctx) => {
  const { event } = await ctx.bootstrap(() =>
    api.query(`{ event(_id: "${ctx.params.id}") { name presented_by maximum_guests } }`)
  )
  state.set('event', event)
  ctx.render({ body: Index })
}
