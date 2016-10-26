import unikoa from 'unikoa'
import bootstrap from 'unikoa-bootstrap'
import render from 'unikoa-react-render'
import { index, state, newEvent, editEvent } from './controllers'
import Head from '../../lib/head'

const router = unikoa()

router.use(bootstrap)
router.use(render({
  head: Head,
  subscribe: (cb) => state.on('update', cb)
}))

router.get('/admin', index)
router.get('/admin/new_event', newEvent)
router.get('/admin/:id', editEvent)

export default router
