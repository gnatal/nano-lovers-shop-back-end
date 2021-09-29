import { Router } from 'express'
import auth from './auth'
import user from './user'
import service from './service'
import product from './product'

const routes = Router()

routes.use('/auth', auth)
routes.use('/user', user)
routes.use('/service', service)
routes.use('/product', product)

export default routes
