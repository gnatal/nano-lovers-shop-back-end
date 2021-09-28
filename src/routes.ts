import { Router } from 'express'
import auth from './routes/auth'
import user from './routes/user'
import service from './routes/service'

const routes = Router()

routes.use('/auth', auth)
routes.use('/user', user)
routes.use('/service', service)

export default routes
