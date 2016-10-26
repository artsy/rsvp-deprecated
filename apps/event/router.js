import unikoa from 'unikoa'
import bootstrap from 'unikoa-bootstrap'
import render from 'unikoa-react-render'
import { index, state, thankYou, admin } from './controllers'
import Head from '../../lib/head'

const router = unikoa()

router.use(bootstrap)
router.use(render({
  head: Head,
  subscribe: (cb) => state.on('update', cb)
}))

router.get('/:id', index)
router.get('/:id/thank-you', thankYou)

export default router
