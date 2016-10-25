const {
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} = process.env

export default function * (next) {
  console.log('HERERERERERERE')
  if (this.request.auth == null) { // No authorization provided
    this.body = 'Please log in.'
    return // Middleware will auto give 401 response
  }

  if (this.request.auth.user !== BASIC_AUTH_USERNAME ||
    this.request.auth.password(BASIC_AUTH_PASSWORD)) {
    this.body = 'Invalid user.'
    delete this.request.auth // Delete request.auth ...
    return // ... will make middleware give 401 response too.
  }

  if (this.url === '/logout') {
    this.body = 'You are successfully logged out.'
    delete this.request.auth // Delete request.auth unconditionally ...
    return // ... will make user logged out.
  }

  this.body = 'Welcome back!'
  yield next
}