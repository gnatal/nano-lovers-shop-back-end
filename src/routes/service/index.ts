import { Router } from 'express'
import { serviceController } from '../../controllers/serviceController'

const router = Router()
//Login route
router.post('/', serviceController.newService)
router.get('/', serviceController.index)

export default router
