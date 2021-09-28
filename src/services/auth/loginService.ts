import {
  errorContract,
  successContract,
} from '../../utils/serviceResponseContract'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'
import * as jwt from 'jsonwebtoken'
import config from '../../config/config'

export default class loginService {
  static excute = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<errorContract | successContract> => {
    if (!(email && password)) {
      return {
        status: 400,
        message: 'Password or e-mail empty',
      } as errorContract
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { email } })
    } catch (error) {
      return {
        status: 401,
        message: 'User not found',
      } as errorContract
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      return {
        status: 401,
        message: 'Wrong password',
      }
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    )

    return {
      status: 200,
      data: token,
    } as successContract
  }
}
