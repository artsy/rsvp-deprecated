const { connect } = require('joiql-mongo')
const hotglue = require('hotglue')
const babelify = require('babelify')
const envify = require('envify')

const app = module.exports = hotglue({
  relative: __dirname,
  server: {
    main: 'server.js',
    watch: [
      'views/**/*',
      'controllers/**/*',
      '../../models/**/*',
      'router.js',
      'server.js'
    ]
  },
  client: {
    main: 'client.js',
    transforms: [babelify, envify],
    watch: [
      'views/**/*',
      'controllers/**/*',
      'router.js',
      'client.js'
    ]
  }
})

if (require.main === module) {
  connect('mongodb://localhost:27017/rsvp')
  app.listen(process.env.PORT)
  console.log('Listening on ' + process.env.PORT)
}
