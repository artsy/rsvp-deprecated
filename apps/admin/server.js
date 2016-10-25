import Koa from 'koa'
import { graphqlize } from 'joiql-mongo'
import router from './router'

const {
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} = process.env

const app = new Koa()

app.use(router.routes())

export default app
