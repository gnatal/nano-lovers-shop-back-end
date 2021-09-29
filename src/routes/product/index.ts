import { Router } from 'express'
import { ProductController } from '../../controllers/productController'

const router = Router()
//Login route
router.post('/', ProductController.create)
router.get('/', ProductController.index)

export default router
