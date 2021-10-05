import { Router } from 'express'
import UserController from '../../controllers/userController'
// import { checkRole } from '../../middlewares/checkRole'

const router = Router()

//Get all users
router.get('/', UserController.listAll)

// Get one user
router.get('/:email([0-9]+)', UserController.getOneById)

//Create a new user
router.post('/', UserController.newUser)

//Edit one user
router.patch('/', UserController.editUser)

//Delete one user
router.delete('/', UserController.deleteUser)

export default router
