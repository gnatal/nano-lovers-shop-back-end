import { Router } from 'express'
import { serviceController } from '../../controllers/serviceController'

const router = Router()
//Login route
router.post('/', serviceController.newService)
router.get('/', serviceController.index)
router.get('/:id', serviceController.getOne)
router.put('/:id', serviceController.update)
router.delete('/:id', serviceController.delete)

export default router
