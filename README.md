[![Build Status](https://semaphoreci.com/api/v1/artsy/rsvp/branches/master/badge.svg)](https://semaphoreci.com/artsy/rsvp)

# RSVP

### Meta
* __State:__ development
* __CI:__ [Semaphore](https://semaphoreci.com/artsy/rsvp)
* __Point People:__ [@broskoski](https://github.com/broskoski), [@craigspaeth](https://github.com/craigspaeth)

### Set-Up

- Fork RSVP to your Github account in the Github UI.
- Clone your repo locally (substitute your Github username).
```
git clone git@github.com:your-github-username/rsvp.git
```
- Install MongoDB
```
brew install mongodb
```
- Install [NVM](https://github.com/creationix/nvm), [Node](https://nodejs.org/en/), and npm modules.
```
brew install nvm
nvm install 6
npm install
```
- Start RSVP and Mongo
```
npm start
```
- RSVP should now be running at http://localhost:3000/

### Testing

We use [standard](https://github.com/feross/standard) for linting. For the best experience it's recommended that you install an inline linter in your text editor, such as [Sublime Linter Standard](https://github.com/Flet/SublimeLinter-contrib-standard), to surface linting issues immediately.

We use [mocha](https://mochajs.org/) for testing. For the best experience writing tests it's recommended you target the suite you're working on in watch mode `npm run mocha -- --watch test/your/tests.js`.

To run the full test suite and linter use `npm test`.