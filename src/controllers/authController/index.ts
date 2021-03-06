import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../../entity/User'
import loginService from '../../services/auth/loginService'

class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => {
    //Check if username and password are set
    const { email, password } = req.body
    const result = await loginService.excute({ email, password })

    res
      .status(result.status)
      .json({ ...result })
      .send()
  }

  static changePassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send()
    }

    //Get user from the database
    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      res.status(401).send()
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send()
      return
    }

    //Validate de model (password lenght)
    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send(errors)
      return
    }
    //Hash the new password and save
    user.hashPassword()
    userRepository.save(user)

    res.status(204).send()
  }
}
export default AuthController
