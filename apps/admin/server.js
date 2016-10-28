import Koa from 'koa'
import router from './router'
import auth from 'koa-basic-auth'

const app = new Koa()

const {
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD
} = process.env

app.use(async (ctx, next) => {
  if (ctx.url.indexOf('admin') >= 0) {
    try {
      return auth({ name: BASIC_AUTH_USERNAME, pass: BASIC_AUTH_PASSWORD })(ctx, next)
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401
        ctx.set('WWW-Authenticate', 'Basic realm=Authorization Required')
      } else {
        throw err
      }
    }
  }
  return next()
})

app.use(router.routes())

export default app
