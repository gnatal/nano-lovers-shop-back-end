import { Router } from 'express'
import { OrderController } from '../../controllers/orderController'

const router = Router()
//Login route
router.post('/', OrderController.create)
router.get('/', OrderController.index)
// router.get('/:id', ProductController.getOne)
// router.put('/:id', ProductController.update)
// router.delete('/:id', ProductController.delete)

export default router
