import Koa from 'koa'
import router from './router'
import mount from 'koa-mount'
import auth from 'koa-basic-auth'

const app = new Koa()

// const {
//   BASIC_AUTH_USERNAME,
//   BASIC_AUTH_PASSWORD
// } = process.env

// app.use(function (ctx, next){
//   ctx.status = 401
//   ctx.set('WWW-Authenticate', 'Basic realm=Authorization Required')
//   return next()
// });

// app.use(mount('/admin', auth({ name: BASIC_AUTH_USERNAME, pass: BASIC_AUTH_PASSWORD })))
app.use(router.routes())

export default app
