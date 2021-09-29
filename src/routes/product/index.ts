import { Router } from 'express'
import { ProductController } from '../../controllers/productController'

const router = Router()
//Login route
router.post('/', ProductController.create)
router.get('/', ProductController.index)
router.get('/:id', ProductController.getOne)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

export default router
