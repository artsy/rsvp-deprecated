import { merge } from 'lodash'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import cheerio from 'cheerio'

export const fixture = (type, attrs) =>
  merge({}, {
    event: {
      '_id': '5810dfd4a8f4bd6aa80e84ba',
      'name': 'A Cool Event',
      'presented_by': 'Cabbie presents',
      'maximum_guests': 3,
      'capacity': 11,
      'closing_date': 'Sat Oct 08 2016 00:00:00 GMT-0400 (EDT)'
    },
    reservation: {
      'name': 'Charles Broskoski',
      'guests': [
        'Ca'
      ],
      'email': 'broskoski@gmail.com',
      'created_at': 'Wed Oct 26 2016 12:55:41 GMT-0400 (EDT)',
      'event_id': '5810dfd4a8f4bd6aa80e84ba'
    }
  }[type], attrs)

export const render = (Component, props = {}) =>
  cheerio.load(renderToString(createElement(Component, props)))
